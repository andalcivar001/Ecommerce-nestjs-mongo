import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compare } from 'bcrypt';
import { hash } from 'bcrypt';

import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async register(user: RegisterAuthDto) {
    // 1) validar si email existe
    const emailExists = await this.userModel
      .findOne({ email: user.email })
      .lean();
    if (emailExists) {
      throw new HttpException('El email ya existe', HttpStatus.CONFLICT);
    }

    // 2) crear usuario (si tu UsersService ya hashea, ideal es re-usarlo;
    // aquí asumo que `user.password` ya llega hasheada o tienes middleware)
    user.password = await hash(user.password, 10);

    const userSaved = await this.userModel.create(user);

    // 3) payload JWT
    const payload = {
      id: userSaved._id.toString(),
      name: (userSaved as any).nombre ?? (userSaved as any).name,
    };

    const token = this.jwtService.sign(payload);

    // 4) quitar password de la respuesta
    const userObj = userSaved.toObject();
    const { password, ...userWithoutPassword } = userObj;

    return {
      user: userWithoutPassword,
      token: 'Bearer ' + token,
    };
  }

  async login(loginData: LoginAuthDto) {
    const { email, password: pwd } = loginData;

    // Si en tu schema tienes password con select:false,
    // necesitas traerlo explícitamente con .select('+password')
    const userFound = await this.userModel
      .findOne({ email })
      .select('+password')
      .exec();

    if (!userFound) {
      throw new HttpException(
        'El usuario no esta registrado',
        HttpStatus.NOT_FOUND,
      );
    }

    const isPwdValid = await compare(pwd, userFound.password);
    if (!isPwdValid) {
      throw new HttpException(
        'La contraseña es incorrecta',
        HttpStatus.FORBIDDEN,
      );
    }

    const payload = {
      id: userFound._id.toString(),
      name: (userFound as any).nombre ?? (userFound as any).name,
    };

    const token = this.jwtService.sign(payload);

    const userObj = userFound.toObject();
    const { password, ...userWithoutPassword } = userObj;

    return {
      user: userWithoutPassword,
      token: 'Bearer ' + token,
    };
  }
}

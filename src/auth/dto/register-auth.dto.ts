import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'El email no es valido' })
  email: string;

  @IsNotEmpty()
  telefono: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: 'La contraseña debe tener minimo 4 caracteres' })
  password: string;

  @IsNotEmpty()
  fechaNacimiento: Date;
}

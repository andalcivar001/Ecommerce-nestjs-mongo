import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  telefono: string;

  @IsNotEmpty()
  fechaNacimiento: Date;

  @IsOptional()
  imagen: string;
}

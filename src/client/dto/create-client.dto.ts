import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsString,
  IsNumber,
} from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  tipoIdentificacion: string;

  @IsString()
  @IsNotEmpty()
  numeroIdentificacion: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  direccion: string;

  @IsOptional()
  @IsNumber()
  telefono: number;

  @IsString()
  @IsNotEmpty()
  idProvincia: string;

  @IsString()
  @IsNotEmpty()
  idCiudad: string;

  @IsOptional()
  @IsNumber()
  latitud: number;

  @IsOptional()
  @IsNumber()
  longitud: number;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}

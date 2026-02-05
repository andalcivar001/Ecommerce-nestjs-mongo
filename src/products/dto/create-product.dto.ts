import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsString,
  IsNumber,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsString()
  @IsOptional()
  codAlterno: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  precio: number;

  @IsNotEmpty()
  @IsString()
  idCategory: string;

  @IsNotEmpty()
  @IsString()
  idSubcategory: string;

  @IsOptional()
  imagen1: string;

  @IsOptional()
  imagen2: string;

  @IsOptional()
  isActive: boolean;
}

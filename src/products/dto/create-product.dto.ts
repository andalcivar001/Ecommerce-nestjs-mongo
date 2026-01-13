import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsString()
  @IsOptional()
  codAlterno: string;

  @IsString()
  @IsOptional()
  stock: number;

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

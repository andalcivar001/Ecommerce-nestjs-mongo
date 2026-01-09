import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsString,
} from 'class-validator';

export class CreateSubCategoryDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsString()
  idCategory: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}

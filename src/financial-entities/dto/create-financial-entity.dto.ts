import { IsNotEmpty, IsOptional, IsBoolean, IsString } from 'class-validator';

export class CreateFinancialEntityDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  tipo: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}

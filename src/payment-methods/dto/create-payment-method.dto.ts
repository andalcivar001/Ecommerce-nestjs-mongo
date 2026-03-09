import { IsNotEmpty, IsOptional, IsBoolean, IsString } from 'class-validator';

export class CreatePaymentMethodDto {
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsString()
  tipoPago: string;

  @IsNotEmpty()
  @IsString()
  abreviatura: string;

  @IsOptional()
  @IsBoolean()
  requiereReferencia: boolean;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}

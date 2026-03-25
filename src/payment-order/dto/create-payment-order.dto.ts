import {
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsString,
  IsNumber,
} from 'class-validator';
//dto
export class CreatePaymentOrderDto {
  @IsNotEmpty()
  @IsString()
  idOrden: string;

  @IsNotEmpty()
  @IsString()
  idPaymentMethod: string;

  @IsNotEmpty()
  @IsNumber()
  monto: number;

  @IsOptional()
  @IsString()
  referencia: string;

  @IsOptional()
  @IsString()
  idEntidadFinanciera: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsString()
  observaciones: string;
}

import {
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsString,
  IsNumber,
} from 'class-validator';

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

  @IsNotEmpty()
  @IsString()
  idEntidadFinanciera: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}

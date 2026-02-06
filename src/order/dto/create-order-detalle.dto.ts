import {
  IsMongoId,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';

export class CreateOrderDetalleDto {
  @IsMongoId()
  idProducto: string;

  @IsNumber()
  @Min(0)
  precio: number;

  @IsNumber()
  @IsPositive()
  cantidad: number;

  @IsOptional()
  @IsNumber()
  latitud: number;

  @IsOptional()
  @IsNumber()
  longitud: number;
}

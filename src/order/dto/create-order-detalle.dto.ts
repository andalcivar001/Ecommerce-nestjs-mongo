import { IsMongoId, IsNumber, IsPositive, Min } from 'class-validator';

export class CreateOrderDetalleDto {
  @IsMongoId()
  idProducto: string;

  @IsNumber()
  @Min(0)
  precio: number;

  @IsNumber()
  @IsPositive()
  cantidad: number;
}

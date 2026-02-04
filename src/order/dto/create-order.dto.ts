import {
  IsArray,
  IsDateString,
  IsMongoId,
  IsNumber,
  Min,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderDetalleDto } from './create-order-detalle.dto';

export class CreateOrderDto {
  @IsDateString()
  fecha: string;
  // Si no quieres recibir fecha, puedes eliminar esto
  // y asignarla en el service

  @IsMongoId()
  idCliente: string;

  @IsNumber()
  @Min(0)
  total: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetalleDto)
  detalles: CreateOrderDetalleDto[];
}

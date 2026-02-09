import {
  IsArray,
  IsDateString,
  IsMongoId,
  IsNumber,
  Min,
  ValidateNested,
  ArrayMinSize,
  isNotEmpty,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderDetalleDto } from './create-order-detalle.dto';

export class CreateOrderDto {
  @IsDateString()
  @IsNotEmpty()
  fecha: string;
  // Si no quieres recibir fecha, puedes eliminar esto
  // y asignarla en el service

  @IsMongoId()
  @IsNotEmpty()
  idCliente: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetalleDto)
  detalles: CreateOrderDetalleDto[];

  @IsMongoId()
  @IsNotEmpty()
  idUsuario: string;
}

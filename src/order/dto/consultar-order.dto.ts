import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class ConsultaOrderDto {
  @IsDateString()
  @IsNotEmpty()
  fechaDesde: string;

  @IsDateString()
  @IsNotEmpty()
  fechaHasta: string;

  @IsMongoId()
  @IsOptional()
  idCliente: string;
}

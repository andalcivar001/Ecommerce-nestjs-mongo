import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now, Types } from 'mongoose';
import { City } from 'src/cities/schema/city.schema';
import { Province } from 'src/province/schema/province.schema';

export type ClientDocument = Client & Document;

@Schema({ timestamps: true })
export class Client {
  @Prop({ required: true, trim: true })
  nombre: string;

  @Prop({ required: true, trim: true })
  tipoIdentificacion: string;

  @Prop({
    required: true,
    trim: true,
    unique: true,
    index: true,
  })
  numeroIdentificacion: string;

  @Prop({
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  })
  email: string;

  @Prop({ required: true, trim: true })
  direccion: string;

  @Prop({ required: true, trim: true })
  telefono: number;

  @Prop({
    type: Types.ObjectId,
    ref: Province.name,
    required: true,
  })
  idProvincia: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: City.name,
    required: true,
  })
  idCiudad: Types.ObjectId;

  @Prop({ required: false })
  latitud: number;

  @Prop({ required: false })
  longitud: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const ClientSchema = SchemaFactory.createForClass(Client);

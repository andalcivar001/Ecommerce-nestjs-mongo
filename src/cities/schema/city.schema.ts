import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now, Types } from 'mongoose';

export type CityDocument = City & Document;

@Schema({ timestamps: true })
export class City {
  @Prop({ required: true, trim: true })
  nombre: string;

  @Prop({ required: true, trim: true })
  codigoProvincia: string;

  @Prop({ required: true, trim: true })
  codigo: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const CitySchema = SchemaFactory.createForClass(City);

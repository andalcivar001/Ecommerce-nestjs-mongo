import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now, Types } from 'mongoose';

export type ProvinceDocument = Province & Document;

@Schema({ timestamps: true })
export class Province {
  @Prop({ required: true, trim: true })
  nombre: string;

  @Prop({ required: true, trim: true })
  codigoProvincia: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const ProvinceSchema = SchemaFactory.createForClass(Province);

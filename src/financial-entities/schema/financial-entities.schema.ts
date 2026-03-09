import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now, Types } from 'mongoose';

export type FinancialEntitiesDocument = FinancialEntities & Document;

@Schema({ timestamps: true })
export class FinancialEntities {
  @Prop({ required: true, trim: true })
  nombre: string;

  @Prop({ required: true, trim: true })
  tipo: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const FinancialEntitiesSchema =
  SchemaFactory.createForClass(FinancialEntities);

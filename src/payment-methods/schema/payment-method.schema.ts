import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now, Types } from 'mongoose';
import { FinancialEntities } from 'src/financial-entities/schema/financial-entities.schema';

export type PaymentMethodDocument = PaymentMethod & Document;

@Schema({ timestamps: true })
export class PaymentMethod {
  @Prop({ required: true, trim: true })
  descripcion: string;

  @Prop({ default: 'E' })
  tipoPago: string;

  @Prop({ required: true, trim: true })
  abreviatura: string;

  @Prop({ default: false })
  requiereReferencia: boolean;

  @Prop({ default: true })
  isActive: boolean;
}

export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);

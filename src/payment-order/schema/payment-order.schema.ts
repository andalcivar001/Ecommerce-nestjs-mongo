import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now, Types } from 'mongoose';
import { FinancialEntities } from 'src/financial-entities/schema/financial-entities.schema';
import { Order } from 'src/order/schema/order.schema';
import { PaymentMethod } from 'src/payment-methods/schema/payment-method.schema';

export type PaymentOrderDocument = PaymentOrder & Document;

@Schema({ timestamps: true })
export class PaymentOrder {
  @Prop({
    type: Types.ObjectId,
    ref: Order.name,
    required: true,
  })
  idOrden: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: PaymentMethod.name,
    required: true,
  })
  idPaymentMethod: Types.ObjectId;

  @Prop({ required: true })
  monto: number;

  @Prop({ required: false })
  referencia: string;

  @Prop({
    type: Types.ObjectId,
    ref: FinancialEntities.name,
    required: false,
  })
  idEntidadFinanciera: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;
}

export const PaymentOrderSchema = SchemaFactory.createForClass(PaymentMethod);

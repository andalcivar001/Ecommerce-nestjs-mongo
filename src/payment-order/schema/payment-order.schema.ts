import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now, Types } from 'mongoose';
import { FinancialEntities } from 'src/financial-entities/schema/financial-entities.schema';
import { Order } from 'src/order/schema/order.schema';
import {
  PaymentMethod,
  PaymentMethodSchema,
} from 'src/payment-methods/schema/payment-method.schema';

export type PaymentOrderDocument = PaymentOrder & Document;

@Schema({ timestamps: true })
export class PaymentOrder {
  @Prop({
    type: Types.ObjectId,
    ref: 'Order',
    required: true,
  })
  idOrden: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'PaymentMethod',
    required: true,
  })
  idPaymentMethod: Types.ObjectId;

  @Prop({ required: true })
  monto: number;

  @Prop({ required: false })
  referencia?: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'FinancialEntities',
    required: false,
  })
  idEntidadFinanciera?: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;
}

export const PaymentOrderSchema = SchemaFactory.createForClass(PaymentOrder);

PaymentOrderSchema.virtual('orden', {
  ref: 'Order',
  localField: 'idOrden',
  foreignField: '_id',
  justOne: true,
});

PaymentOrderSchema.virtual('metodoPago', {
  ref: 'PaymentMethod',
  localField: 'idPaymentMethod',
  foreignField: '_id',
  justOne: true,
});

PaymentOrderSchema.virtual('entidadFinanciera', {
  ref: 'FinancialEntities',
  localField: 'idEntidadFinanciera',
  foreignField: '_id',
  justOne: true,
});

// habilito las virtuales
PaymentOrderSchema.set('toJSON', { virtuals: true });
PaymentOrderSchema.set('toObject', { virtuals: true });

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now, Types } from 'mongoose';
import { Client } from 'src/client/schema/client.schema';
import { Product } from 'src/products/schemas/product.schema';

export type OrderDocument = Order & Document;

@Schema()
export class OrderDetalle {
  @Prop({
    type: Types.ObjectId,
    ref: Product.name,
    required: true,
  })
  idProducto: Types.ObjectId;

  @Prop({ required: true, min: 0 })
  precioVenta: number;

  @Prop({ required: true, min: 1 })
  cantidad: number;
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, default: Date.now })
  fecha: Date;

  @Prop({
    type: Types.ObjectId,
    ref: Client.name,
    required: true,
  })
  idCliente: Types.ObjectId;

  @Prop({ required: true })
  total: number;

  @Prop({
    type: [OrderDetalle],
    required: true,
    validate: [
      (v: OrderDetalle[]) => v.length > 0,
      'El pedido debe tener al menos un detalle',
    ],
  })
  detalles: OrderDetalle[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);

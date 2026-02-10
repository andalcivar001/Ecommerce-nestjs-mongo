import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now, Types } from 'mongoose';
import { Client } from 'src/client/schema/client.schema';
import { Product } from 'src/products/schemas/product.schema';
import { User } from 'src/users/schemas/user.schema';

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
  precio: number;

  @Prop({ required: true, min: 1 })
  cantidad: number;
}

/* ======================================================
   Schema explícito del subdocumento
====================================================== */
export const OrderDetalleSchema = SchemaFactory.createForClass(OrderDetalle);

/* ======================================================
   Virtual: producto
====================================================== */
OrderDetalleSchema.virtual('producto', {
  ref: Product.name,
  localField: 'idProducto',
  foreignField: '_id',
  justOne: true,
});

OrderDetalleSchema.set('toJSON', { virtuals: true });
OrderDetalleSchema.set('toObject', { virtuals: true });

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, default: Date.now })
  fecha: Date;

  @Prop({ required: false, default: 0 }) // Changed: will be auto-generated
  secuencia: number;

  @Prop({
    type: Types.ObjectId,
    ref: Client.name,
    required: true,
  })
  idCliente: Types.ObjectId;

  @Prop({ required: true })
  total: number;

  @Prop({
    type: [OrderDetalleSchema],
    required: true,
    validate: [
      (v: OrderDetalle[]) => v.length > 0,
      'El pedido debe tener al menos un detalle',
    ],
  })
  detalles: OrderDetalle[];

  @Prop({ required: false, default: 'N' })
  estado: string;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  idUsuario: Types.ObjectId;

  @Prop({ required: false })
  latitud: number;

  @Prop({ required: false })
  longitud: number;
}
export const OrderSchema = SchemaFactory.createForClass(Order);

// creo campos virtuales para devolverlos en el response
OrderSchema.virtual('cliente', {
  ref: Client.name,
  localField: 'idCliente',
  foreignField: '_id',
  justOne: true,
});

OrderSchema.virtual('usuario', {
  ref: User.name,
  localField: 'idUsuario',
  foreignField: '_id',
  justOne: true,
});

// habilito las virtuales
OrderSchema.set('toJSON', { virtuals: true });
OrderSchema.set('toObject', { virtuals: true });

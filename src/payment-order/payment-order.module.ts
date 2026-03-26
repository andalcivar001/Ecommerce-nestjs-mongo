import { Module } from '@nestjs/common';
import { PaymentOrderService } from './payment-order.service';
import { PaymentOrderController } from './payment-order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PaymentOrder,
  PaymentOrderSchema,
} from './schema/payment-order.schema';
import { Order, OrderSchema } from 'src/order/schema/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentOrder.name, schema: PaymentOrderSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  providers: [PaymentOrderService],
  controllers: [PaymentOrderController],
})
export class PaymentOrderModule {}

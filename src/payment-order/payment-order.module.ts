import { Module } from '@nestjs/common';
import { PaymentOrderService } from './payment-order.service';
import { PaymentOrderController } from './payment-order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PaymentOrder,
  PaymentOrderSchema,
} from './schema/payment-order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentOrder.name, schema: PaymentOrderSchema },
    ]),
  ],
  providers: [PaymentOrderService],
  controllers: [PaymentOrderController],
})
export class PaymentOrderModule {}

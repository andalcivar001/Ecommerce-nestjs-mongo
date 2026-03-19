import { Module } from '@nestjs/common';
import { PaymentOrderService } from './payment-order.service';
import { PaymentOrderController } from './payment-order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PaymentOrder,
  PaymentOrderSchema,
} from './schema/payment-order.schema';
import {
  FinancialEntities,
  FinancialEntitiesSchema,
} from 'src/financial-entities/schema/financial-entities.schema';
import {
  PaymentMethod,
  PaymentMethodSchema,
} from 'src/payment-methods/schema/payment-method.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentOrder.name, schema: PaymentOrderSchema },
      { name: FinancialEntities.name, schema: FinancialEntitiesSchema },
      { name: PaymentMethod.name, schema: PaymentMethodSchema },
    ]),
  ],
  providers: [PaymentOrderService],
  controllers: [PaymentOrderController],
})
export class PaymentOrderModule {}

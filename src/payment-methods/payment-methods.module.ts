import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PaymentMethod,
  PaymentMethodSchema,
} from './schema/payment-method.schema';
import { PaymentMethodsController } from './payment-methods.controller';
import { PaymentMethodsService } from './payment-methods.service';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { Order, OrderSchema } from 'src/order/schema/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: PaymentMethod.name, schema: PaymentMethodSchema },
    ]),
  ],
  providers: [PaymentMethodsService, JwtStrategy],
  controllers: [PaymentMethodsController],
})
export class PaymentMethodsModule {}

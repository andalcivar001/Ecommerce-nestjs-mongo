import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schema/order.schema';
import { Counter, CounterSchema } from './schema/counter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Counter.name, schema: CounterSchema },
    ]),
  ],
  providers: [OrderService, JwtStrategy],
  controllers: [OrderController],
})
export class OrderModule {}

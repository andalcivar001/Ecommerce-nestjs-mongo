import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentOrderDto } from './create-payment-order.dto';

export class UpdatePaymentOrderDto extends PartialType(CreatePaymentOrderDto) {}

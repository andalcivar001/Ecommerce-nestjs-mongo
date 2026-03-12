import {
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { PaymentOrderService } from './payment-order.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreatePaymentOrderDto } from './dto/create-payment-order.dto';
import { UpdatePaymentOrderDto } from './dto/update-payment-order.dto';

@Controller('payment-order')
export class PaymentOrderController {
  constructor(private readonly poService: PaymentOrderService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.poService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.poService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() fe: CreatePaymentOrderDto) {
    return this.poService.create(fe);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() fe: UpdatePaymentOrderDto) {
    return this.poService.update(id, fe);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.poService.delete(id);
  }
}

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
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { PaymentMethodsService } from './payment-methods.service';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';

@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private readonly pmService: PaymentMethodsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.pmService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.pmService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() fe: CreatePaymentMethodDto) {
    return this.pmService.create(fe);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() fe: UpdatePaymentMethodDto) {
    return this.pmService.update(id, fe);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.pmService.delete(id);
  }
}

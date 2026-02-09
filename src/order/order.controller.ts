import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ConsultaOrderDto } from './dto/consultar-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':idUsuario')
  findAll(@Param('idUsuario') idUsuario: string) {
    return this.orderService.findAll(idUsuario);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.orderService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() category: CreateOrderDto) {
    return this.orderService.create(category);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() category: UpdateOrderDto) {
    return this.orderService.update(id, category);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.orderService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('consultar')
  async consultarOrders(@Body() consultaOrderDto: ConsultaOrderDto) {
    return this.orderService.consultarOrders(consultaOrderDto);
  }
}

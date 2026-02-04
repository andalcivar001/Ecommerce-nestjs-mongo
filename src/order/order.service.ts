import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Order, OrderDocument } from './schema/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  async create(order: CreateOrderDto) {
    const newOrder = new this.orderModel(order);
    return await newOrder.save();
  }

  async findAll() {
    return await this.orderModel.find();
  }

  async findById(id: string) {
    try {
      const order = await this.orderModel.findById(id);
      if (!order) {
        throw new HttpException('Orden no encontrada', HttpStatus.NOT_FOUND);
      }

      return order;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, order: UpdateOrderDto) {
    try {
      const orderFound = await this.orderModel.findById(id);

      if (!orderFound) {
        throw new HttpException('Orden no existe', HttpStatus.NOT_FOUND);
      }

      Object.assign(orderFound, order);
      return await orderFound.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('ID inválido');
    }

    const order = await this.orderModel.findByIdAndDelete(id);

    if (!order) {
      throw new HttpException('Orden no encontrada', HttpStatus.NOT_FOUND);
    }

    return true;
  }
}

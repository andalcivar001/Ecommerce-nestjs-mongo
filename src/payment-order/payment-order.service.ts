import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {
  PaymentOrder,
  PaymentOrderDocument,
} from './schema/payment-order.schema';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePaymentOrderDto } from './dto/create-payment-order.dto';
import { UpdatePaymentOrderDto } from './dto/update-payment-order.dto';
import { Order, OrderDocument } from 'src/order/schema/order.schema';

@Injectable()
export class PaymentOrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    @InjectModel(PaymentOrder.name)
    private readonly pmModel: Model<PaymentOrderDocument>,
  ) {}
  async findAll(idOrden: string) {
    return await this.pmModel
      .find({ idOrden: idOrden })
      .populate('metodoPago')
      .populate('entidadFinanciera')
      .sort({ createdAt: -1 });
  }

  async findById(id: string) {
    try {
      const category = await this.pmModel.findById(id);
      if (!category) {
        throw new HttpException('Entidad no encontrada', HttpStatus.NOT_FOUND);
      }

      return category;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(pm: CreatePaymentOrderDto) {
    const newPm = new this.pmModel(pm);
    const saved = await newPm.save();
    await this.actualizarTotalPagado(pm.idOrden);
    return saved;
  }

  async update(id: string, fe: UpdatePaymentOrderDto) {
    try {
      const pmFound = await this.pmModel.findById(id);

      if (!pmFound) {
        throw new HttpException('Método no existe', HttpStatus.NOT_FOUND);
      }
      Object.assign(pmFound, fe);
      const updated = await pmFound.save();
      await this.actualizarTotalPagado(pmFound.idOrden.toString());
      return updated;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string) {
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('ID inválido');
      }

      const pm = await this.pmModel.findByIdAndDelete(id);

      if (!pm) {
        throw new HttpException('Método no encontrado', HttpStatus.NOT_FOUND);
      }

      await this.actualizarTotalPagado(pm.idOrden.toString());

      return true;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async actualizarTotalPagado(idOrden: string) {
    const pagos = await this.pmModel.find({ idOrden: idOrden });
    const totalPagos = pagos.reduce((total, pago) => total + pago.monto, 0);
    const order = await this.orderModel.findById(idOrden);
    if (!order) {
      throw new HttpException('Orden no encontrada', HttpStatus.NOT_FOUND);
    }
    order.totalPagado = totalPagos;
    await order.save();
    return order;
  }
}

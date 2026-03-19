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

@Injectable()
export class PaymentOrderService {
  constructor(
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
    return await newPm.save();
  }

  async update(id: string, fe: UpdatePaymentOrderDto) {
    try {
      const pmFound = await this.pmModel.findById(id);

      if (!pmFound) {
        throw new HttpException('Método no existe', HttpStatus.NOT_FOUND);
      }

      Object.assign(pmFound, fe);
      return await pmFound.save();
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

      return true;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

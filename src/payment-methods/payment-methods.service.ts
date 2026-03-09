import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PaymentMethod,
  PaymentMethodDocument,
} from './schema/payment-method.schema';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectModel(PaymentMethod.name)
    private readonly pmModel: Model<PaymentMethodDocument>,
  ) {}
  async findAll() {
    return await this.pmModel.find().sort({ nombre: 1 });
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

  async create(pm: CreatePaymentMethodDto) {
    const newPm = new this.pmModel(pm);
    return await newPm.save();
  }

  async update(id: string, fe: UpdatePaymentMethodDto) {
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

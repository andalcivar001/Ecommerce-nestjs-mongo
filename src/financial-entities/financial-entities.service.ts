import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {
  FinancialEntities,
  FinancialEntitiesDocument,
} from './schema/financial-entities.schema';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFinancialEntityDto } from './dto/create-financial-entity.dto';

@Injectable()
export class FinancialEntitiesService {
  constructor(
    @InjectModel(FinancialEntities.name)
    private readonly feModel: Model<FinancialEntitiesDocument>,
  ) {}
  async findAll() {
    return await this.feModel.find().sort({ nombre: 1 });
  }

  async findById(id: string) {
    try {
      const category = await this.feModel.findById(id);
      if (!category) {
        throw new HttpException('Entidad no encontrada', HttpStatus.NOT_FOUND);
      }

      return category;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(fe: CreateFinancialEntityDto) {
    const newFe = new this.feModel(fe);
    return await newFe.save();
  }

  async update(id: string, fe: CreateFinancialEntityDto) {
    try {
      const feFound = await this.feModel.findById(id);

      if (!feFound) {
        throw new HttpException('Entidad no existe', HttpStatus.NOT_FOUND);
      }

      Object.assign(feFound, fe);
      return await feFound.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string) {
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('ID inválido');
      }

      const fe = await this.feModel.findByIdAndDelete(id);

      if (!fe) {
        throw new HttpException('Entidad no encontrada', HttpStatus.NOT_FOUND);
      }

      return true;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

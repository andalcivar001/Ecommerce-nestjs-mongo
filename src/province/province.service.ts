import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Province, ProvinceDocument } from './schema/province.schema';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectModel(Province.name)
    private readonly provinceModel: Model<ProvinceDocument>,
  ) {}

  async findAll() {
    return await this.provinceModel.find().sort({ nombre: 1 });
  }
}

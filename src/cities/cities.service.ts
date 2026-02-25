import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { City, CityDocument } from './schema/city.schema';
import { Model } from 'mongoose';

@Injectable()
export class CitiesService {
  constructor(
    @InjectModel(City.name)
    private readonly cityModel: Model<CityDocument>,
  ) {}
  async findAll() {
    return await this.cityModel.find().sort({ nombre: 1 });
  }

  async findByProvince(idProvince: string) {
    try {
      const cities = await this.cityModel
        .find({
          codigoProvincia: idProvince,
        })
        .sort({ nombre: 1 });
      if (!cities) {
        throw new HttpException('Ciudad no encontrada', HttpStatus.NOT_FOUND);
      }

      return cities;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

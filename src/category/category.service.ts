import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Category, CategoryDocument } from './schema/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async create(category: CreateCategoryDto) {
    const newCategory = new this.categoryModel(category);
    return await newCategory.save();
  }

  async findAll() {
    return await this.categoryModel.find().sort({ nombre: 1 });
  }

  async findById(id: string) {
    try {
      const category = await this.categoryModel.findById(id);
      if (!category) {
        throw new HttpException(
          'Categoria no encontrada',
          HttpStatus.NOT_FOUND,
        );
      }

      return category;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, category: UpdateCategoryDto) {
    try {
      const categoryFound = await this.categoryModel.findById(id);

      if (!categoryFound) {
        throw new HttpException('Categoria no existe', HttpStatus.NOT_FOUND);
      }

      Object.assign(categoryFound, category);
      return await categoryFound.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string) {
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('ID inválido');
      }

      const category = await this.categoryModel.findByIdAndDelete(id);

      if (!category) {
        throw new HttpException(
          'Categoria no encontrada',
          HttpStatus.NOT_FOUND,
        );
      }

      return true;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { SubCategory, SubCategoryDocument } from './schema/subcategory.schema';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import {
  Category,
  CategoryDocument,
} from 'src/category/schema/category.schema';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel(SubCategory.name)
    private readonly subCategoryModel: Model<SubCategoryDocument>,

    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async create(subcategory: CreateSubCategoryDto) {
    if (!isValidObjectId(subcategory.idCategory)) {
      throw new BadRequestException('ID de cateogria es inválido');
    }

    const categoryFound = await this.categoryModel.findById(
      subcategory.idCategory,
    );
    if (!categoryFound) {
      throw new HttpException('Categoria no encontrada', HttpStatus.NOT_FOUND);
    }

    const newSubCategory = new this.subCategoryModel(subcategory);
    return await newSubCategory.save();
  }

  async findAll() {
    return await this.subCategoryModel.find();
  }

  async findById(id: string) {
    try {
      const subcategory = await this.subCategoryModel.findById(id);
      if (!subcategory) {
        throw new HttpException(
          'SubCategoria no encontrada',
          HttpStatus.NOT_FOUND,
        );
      }

      return subcategory;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, subcategory: UpdateSubCategoryDto) {
    try {
      const subcategoryFound = await this.subCategoryModel.findById(id);

      if (!subcategoryFound) {
        throw new HttpException('SubCategoria no existe', HttpStatus.NOT_FOUND);
      }

      Object.assign(subcategoryFound, subcategory);
      return await subcategoryFound.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('ID inválido');
    }

    const category = await this.subCategoryModel.findByIdAndDelete(id);

    if (!category) {
      throw new HttpException(
        'SubCategoria no encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: 'SubCategoria eliminada correctamente',
      id,
    };
  }
}

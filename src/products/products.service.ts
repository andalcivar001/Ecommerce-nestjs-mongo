import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from 'src/category/schema/category.schema';
import { CreateSubCategoryDto } from 'src/sub-category/dto/create-sub-category.dto';
import {
  SubCategory,
  SubCategoryDocument,
} from 'src/sub-category/schema/subcategory.schema';
import uploadFile from 'src/utils/cloud_storage';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,

    @InjectModel(SubCategory.name)
    private readonly subCategoryModel: Model<SubCategoryDocument>,

    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async findAll() {
    return await this.productModel.find().sort({ descripcion: 1 });
  }

  async findById(id: string) {
    try {
      const category = await this.productModel.findById(id);
      if (!category) {
        throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
      }

      return category;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByCodAlterno(code: string) {
    try {
      const product = await this.productModel.findOne({ codAlterno: code });
      if (!product) {
        throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
      }
      return product;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByDescription(query: string) {
    try {
      if (!query?.trim()) {
        throw new BadRequestException('El término de búsqueda es requerido');
      }
      // 1. Creamos la expresión regular.
      // 'i' hace que no importe si es mayúscula o minúscula (case-insensitive)
      const searchRegex = new RegExp(query, 'i');

      const products = await this.productModel
        .find({
          $or: [
            { descripcion: { $regex: searchRegex } },
            { codAlterno: { $regex: searchRegex } },
          ],
        })
        .exec(); // .exec() es una buena práctica en Mongoose para retornar una promesa real

      return products;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async craeteWithImages(
    product: CreateProductDto,
    file1?: Express.Multer.File,
    file2?: Express.Multer.File,
  ) {
    try {
      let url1 = '';
      let url2 = '';

      if (file1) {
        url1 = await uploadFile(file1, file1.originalname);

        if (!url1) {
          throw new HttpException(
            'La imagen 1 no se pudo guardar',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }

      if (file2) {
        url2 = await uploadFile(file2, file2.originalname);

        if (!url2) {
          throw new HttpException(
            'La imagen 2 no se pudo guardar',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }

      // let dto: CreateProductDto;
      // dto = product;
      product.imagen1 = url1;
      product.imagen2 = url2;

      // if (typeof product.product === 'string') {
      //   try {
      //     dto = JSON.parse(product.product);
      //   } catch (error) {
      //     throw new BadRequestException(
      //       'Formato JSON inválido',
      //       product.toString(),
      //     );
      //   }
      // } else {
      //   dto = product;
      // }
      // dto.imagen1 = url1;
      // dto.imagen2 = url2;

      const newProducdt = new this.productModel(product);
      return await newProducdt.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async updateWithImages(
    id: string,
    product: any,
    file1?: Express.Multer.File,
    file2?: Express.Multer.File,
  ) {
    try {
      const productFound = await this.productModel.findById(id);

      if (!productFound) {
        throw new HttpException('Producto no existe', HttpStatus.NOT_FOUND);
      }

      let dto: CreateProductDto;

      if (typeof product.product === 'string') {
        try {
          dto = JSON.parse(product.product);
        } catch (error) {
          throw new BadRequestException(
            'Formato JSON inválido',
            product.toString(),
          );
        }
      } else {
        dto = product;
      }

      let url1 = '';
      let url2 = '';

      if (file1) {
        url1 = await uploadFile(file1, file1.originalname);

        if (!url1) {
          throw new HttpException(
            'La imagen 1 no se pudo guardar',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        dto.imagen1 = url1;
      } else {
        dto.imagen1 = productFound.imagen1;
      }

      if (file2) {
        url2 = await uploadFile(file2, file2.originalname);

        if (!url2) {
          throw new HttpException(
            'La imagen 2 no se pudo guardar',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        dto.imagen2 = url2;
      } else {
        dto.imagen2 = productFound.imagen2;
      }

      Object.assign(productFound, dto);
      return await productFound.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string) {
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('ID inválido');
      }

      const product = await this.productModel.findByIdAndDelete(id);

      if (!product) {
        throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
      }

      return true;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

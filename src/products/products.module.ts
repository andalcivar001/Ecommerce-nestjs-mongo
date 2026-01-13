import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { Category, CategorySchema } from 'src/category/schema/category.schema';
import {
  SubCategory,
  SubCategorySchema,
} from 'src/sub-category/schema/subcategory.schema';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: SubCategory.name, schema: SubCategorySchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [ProductService, JwtStrategy],
  controllers: [ProductController],
})
export class ProductModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategory, SubCategorySchema } from './schema/subcategory.schema';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { Category, CategorySchema } from 'src/category/schema/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubCategory.name, schema: SubCategorySchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [SubCategoryService, JwtStrategy],
  controllers: [SubCategoryController],
})
export class SubCategoryModule {}

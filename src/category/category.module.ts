import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schema/category.schema';
import { CategoryService } from './category.service';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { CategoryController } from './category.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [CategoryService, JwtStrategy],
  controllers: [CategoryController],
})
export class CategoryModule {}

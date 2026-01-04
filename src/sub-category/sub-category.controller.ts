import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { SubCategoryService } from './sub-category.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly subcategoryService: SubCategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.subcategoryService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.subcategoryService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() subcategory: CreateSubCategoryDto) {
    return this.subcategoryService.create(subcategory);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() subcategory: UpdateSubCategoryDto) {
    return this.subcategoryService.update(id, subcategory);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.subcategoryService.delete(id);
  }
}

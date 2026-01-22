import {
  Body,
  Controller,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file1', maxCount: 1 },
      { name: 'file2', maxCount: 1 },
    ]),
  )
  async createWithImages(
    @UploadedFiles()
    files: {
      file1?: Express.Multer.File[];
      file2?: Express.Multer.File[];
    },
    @Body() product: CreateProductDto,
  ) {
    const file1 = files?.file1?.[0];
    const file2 = files?.file2?.[0];

    // ✅ file1 opcional
    if (file1) {
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 })],
      }).transform(file1);
    }

    // ✅ file2 opcional
    if (file2) {
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 })],
      }).transform(file2);
    }
    debugger;
    return this.productService.craeteWithImages(product, file1, file2);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file1', maxCount: 1 },
      { name: 'file2', maxCount: 1 },
    ]),
  )
  async updateWithImages(
    @UploadedFiles()
    files: {
      file1?: Express.Multer.File[];
      file2?: Express.Multer.File[];
    },
    @Param('id') id: string,
    @Body() product: CreateProductDto,
  ) {
    const file1 = files?.file1?.[0];
    const file2 = files?.file2?.[0];

    // ✅ file1 opcional
    if (file1) {
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 })],
      }).transform(file1);
    }

    // ✅ file2 opcional
    if (file2) {
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 })],
      }).transform(file2);
    }
    debugger;
    return this.productService.updateWithImages(id, product, file1, file2);
  }
}

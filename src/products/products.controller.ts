import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('search') // La URL final será /products/search?q=tu_busqueda
  async search(@Query('q') query: string) {
    // 1. Validación básica: Si no envían nada, devolvemos un error o lista vacía
    if (!query || query.trim().length === 0) {
      throw new HttpException(
        'El término de búsqueda es requerido',
        HttpStatus.BAD_REQUEST,
      );
    }

    // 2. Llamamos al método del servicio
    const results = await this.productService.findByDescription(query);

    // 3. Retornamos los resultados (Nest enviará un 200 OK por defecto)
    return results;
  }

  @UseGuards(JwtAuthGuard)
  @Get('code/:code')
  findByCodAlterno(@Param('code') code: string) {
    return this.productService.findByCodAlterno(code);
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
    @Body() product: UpdateProductDto,
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
    console.log('ID PARAM:', id);
    return this.productService.updateWithImages(id, product, file1, file2);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}

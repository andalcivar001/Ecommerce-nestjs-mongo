import {
  Body,
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFiles,
} from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  updateWithImages(
    @UploadedFiles()
    files: {
      file1?: Express.Multer.File[];
      file2?: Express.Multer.File[];
    },
    @Body() product: any,
  ) {
    const file1 = files?.file1?.[0];
    const file2 = files?.file2?.[0];

    // Validar file1 (si es requerido)
    new ParseFilePipe({
      validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 })],
    }).transform(file1);

    // Validar file2 (si es requerido)
    new ParseFilePipe({
      validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 })],
    }).transform(file2);

    return this.productService.craeteWithImages(product, file1, file2);
  }
}

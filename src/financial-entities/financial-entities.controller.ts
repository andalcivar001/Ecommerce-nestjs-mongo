import {
  Body,
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FinancialEntitiesService } from './financial-entities.service';
import { CreateFinancialEntityDto } from './dto/create-financial-entity.dto';

@Controller('financial-entities')
export class FinancialEntitiesController {
  constructor(private readonly feService: FinancialEntitiesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.feService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.feService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() fe: CreateFinancialEntityDto) {
    return this.feService.create(fe);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() fe: CreateFinancialEntityDto) {
    return this.feService.update(id, fe);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.feService.delete(id);
  }
}

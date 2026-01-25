import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.provinceService.findAll();
  }
}

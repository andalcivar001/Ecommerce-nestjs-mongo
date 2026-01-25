import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.citiesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findByProvince(@Param('id') id: string) {
    return this.citiesService.findByProvince(id);
  }
}

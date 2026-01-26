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
import { ClientService } from './client.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.clientService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() client: CreateClientDto) {
    return this.clientService.create(client);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() client: UpdateClientDto) {
    return this.clientService.update(id, client);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.clientService.delete(id);
  }
}

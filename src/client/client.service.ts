import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Client, ClientDocument } from './schema/client.schema';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, MongooseError } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<ClientDocument>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const client = await this.clientModel.create(createClientDto);
      return client;
    } catch (error) {
      console.error('ERROR GUARDANDO CLIENTE 222', error.message);
      throw new InternalServerErrorException(
        'Error creating client',
        error.message,
      );
    }
  }

  async findAll() {
    return await this.clientModel.find();
  }

  async findById(id: string) {
    try {
      const client = await this.clientModel.findById(id);
      if (!client) {
        throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
      }

      return client;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, client: UpdateClientDto) {
    try {
      const clientFound = await this.clientModel.findById(id);

      if (!clientFound) {
        throw new HttpException('Cliente no existe', HttpStatus.NOT_FOUND);
      }

      Object.assign(clientFound, client);
      return await clientFound.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('ID inválido');
    }

    const client = await this.clientModel.findByIdAndDelete(id);

    if (!client) {
      throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
    }

    return true;
  }
}

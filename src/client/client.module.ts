import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { Client, ClientSchema } from './schema/client.schema';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
  ],
  providers: [ClientService, JwtStrategy],
  controllers: [ClientController],
})
export class ClientModule {}

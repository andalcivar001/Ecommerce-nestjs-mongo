import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { City, CitySchema } from './schema/city.schema';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
  ],
  providers: [CitiesService, JwtStrategy],
  controllers: [CitiesController],
})
export class CitiesModule {}

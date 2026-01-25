import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { Province, ProvinceSchema } from './schema/province.schema';
import { ProvinceService } from './province.service';
import { ProvinceController } from './province.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Province.name, schema: ProvinceSchema },
    ]),
  ],
  providers: [ProvinceService, JwtStrategy],
  controllers: [ProvinceController],
})
export class ProvinceModule {}

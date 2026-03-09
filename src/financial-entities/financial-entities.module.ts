import { Module } from '@nestjs/common';
import { FinancialEntitiesService } from './financial-entities.service';
import { FinancialEntitiesController } from './financial-entities.controller';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FinancialEntities,
  FinancialEntitiesSchema,
} from './schema/financial-entities.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FinancialEntities.name, schema: FinancialEntitiesSchema },
    ]),
  ],
  providers: [FinancialEntitiesService, JwtStrategy],
  controllers: [FinancialEntitiesController],
})
export class FinancialEntitiesModule {}

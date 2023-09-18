import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { cargoProviders } from './cargo.providers';
import { CargoService } from './cargo.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...cargoProviders,
    CargoService,
  ],
})
export class CargoModule {}
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { itemPaiProviders } from './itemPai.providers';
import { ItemPaiService } from './itemPai.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...itemPaiProviders,
    ItemPaiService,
  ],
})
export class ItemPaiModule {}
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { itemFilhoProviders } from './itemFilho.providers';
import { ItemFilhoService } from './itemFilho.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...itemFilhoProviders,
    ItemFilhoService,
  ],
})
export class ItemFilhoModule {}
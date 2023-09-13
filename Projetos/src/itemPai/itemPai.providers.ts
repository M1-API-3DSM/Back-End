import { DataSource } from 'typeorm';
import { ItemPai } from './itemPai.entity';

export const itemPaiProviders = [
  {
    provide: 'ItemPai_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ItemPai),
    inject: ['DATABASE_CONNECTION'],
  },
];
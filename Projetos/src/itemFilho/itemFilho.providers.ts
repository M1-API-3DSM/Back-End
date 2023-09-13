import { DataSource } from 'typeorm';
import { ItemFilho } from './itemFilho.entity';

export const itemFilhoProviders = [
  {
    provide: 'ItemFilho_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ItemFilho),
    inject: ['DATABASE_CONNECTION'],
  },
];
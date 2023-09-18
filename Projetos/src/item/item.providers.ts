import { DataSource } from 'typeorm';
import { Item } from './item.entity';

export const itemProviders = [
  {
    provide: 'Item_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Item),
    inject: ['DATABASE_CONNECTION'],
  },
];
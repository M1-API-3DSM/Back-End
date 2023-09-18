import { DataSource } from 'typeorm';
import { Cargo } from './cargo.entity';

export const cargoProviders = [
  {
    provide: 'Cargo_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cargo),
    inject: ['DATABASE_CONNECTION'],
  },
];
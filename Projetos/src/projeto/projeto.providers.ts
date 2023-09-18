import { DataSource } from 'typeorm';
import { Projeto } from './projeto.entity';

export const projetoProviders = [
  {
    provide: 'Projeto_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Projeto),
    inject: ['DATABASE_CONNECTION'],
  },
];
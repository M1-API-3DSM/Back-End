import { DataSource } from 'typeorm';
import { AvancoTarefas } from './avancoTarefas.entity';

export const avancoTarefasProviders = [
  {
    provide: 'AvancoTarefas_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AvancoTarefas),
    inject: ['DATABASE_CONNECTION'],
  },
];
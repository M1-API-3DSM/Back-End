import { DataSource } from 'typeorm';
import { Tarefas } from './tarefas.entity';

export const tarefasProviders = [
  {
    provide: 'Tarefas_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tarefas),
    inject: ['DATABASE_CONNECTION'],
  },
];
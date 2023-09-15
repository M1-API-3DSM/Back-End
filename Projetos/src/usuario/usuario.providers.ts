import { DataSource } from 'typeorm';
import { Usuario } from './usuario.entity';

export const usuarioProviders = [
  {
    provide: 'Usuario_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Usuario),
    inject: ['DATABASE_CONNECTION'],
  },
];
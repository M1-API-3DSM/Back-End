import { DataSource, DataSourceOptions } from 'typeorm';

const databaseOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'api',
  entities: [
    __dirname + '/../**/*.entity{.ts,.js}',
  ],
  migrations: [
    __dirname + '/../migrations/*{.ts,.js}',
  ],
  migrationsRun: true, // 
};

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      const dataSource = new DataSource(databaseOptions);
      return dataSource.initialize();
    },
  },
];

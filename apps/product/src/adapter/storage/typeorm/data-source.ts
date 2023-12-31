import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT || 5432),
  database: process.env.TYPEORM_DATABASE,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  schema: 'public',
  entities: ['./src/adapter/storage/entities/*.entity.ts'],
  migrations: ['./src/adapter/storage/migrations/*.ts'],
  migrationsTableName: 'ms_product_migrations',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

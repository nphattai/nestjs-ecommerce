import { AppEnv, IBaseConfig } from './type';

export const baseConfig = (): IBaseConfig => ({
  app: {
    env: (process.env['APP_ENV'] as AppEnv) || AppEnv.LOCAL,
    port: Number(process.env['PORT']),
  },
  db: {
    primaryHost: process.env['TYPEORM_HOST'] || 'localhost',
    port: Number(process.env['TYPEORM_PORT']) || 5432,
    username: process.env['TYPEORM_USERNAME'] || 'postgres',
    password: process.env['TYPEORM_PASSWORD'] || '',
    database: process.env['TYPEORM_DATABASE'] || 'nestjs-ecommerce',
    schema: process.env['TYPEORM_SCHEMA'] || 'public',
  },
});

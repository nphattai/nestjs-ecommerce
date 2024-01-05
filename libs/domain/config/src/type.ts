export const enum AppEnv {
  LOCAL = 'local',
  PROD = 'production',
  DEV = 'development',
  TEST = 'test',
}

export interface IBaseConfig {
  app: {
    env: AppEnv;
    port: number;
  };
  db: {
    primaryHost: string;
    port: number;
    username: string;
    password: string;
    database: string;
    schema: string;
  };
}

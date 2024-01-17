import { IBaseConfig, baseConfig } from '@domain/config';

export interface IGatewayConfig extends IBaseConfig {
  jwt: {
    jwtAccessSecret: string;
    jwtAccessExpiresIn: number;
    jwtRefreshSecret: string;
    jwtRefreshExpiresIn: number;
  };
}

export default (): IGatewayConfig => ({
  ...baseConfig(),
  jwt: {
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'INFINA',
    jwtAccessExpiresIn: 7 * 24 * 60 * 60, //7d
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'INFINA',
    jwtRefreshExpiresIn: 30 * 24 * 60 * 60, //30d
  },
});

import { IBaseConfig, baseConfig } from '@domain/config';

export interface IUserConfig extends IBaseConfig {}

export default (): IUserConfig => ({
  ...baseConfig(),
});

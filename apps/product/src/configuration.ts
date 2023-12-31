import { IBaseConfig, baseConfig } from '@domain/config';

export interface IProductConfig extends IBaseConfig {}

export default (): IProductConfig => ({
  ...baseConfig(),
});

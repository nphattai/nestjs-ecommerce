import { toInstance } from '@common/mapping';

export abstract class BaseDTO {
  static init<T extends BaseDTO>(this: new (...args: any[]) => T, data: T) {
    return toInstance(this, data);
  }
}

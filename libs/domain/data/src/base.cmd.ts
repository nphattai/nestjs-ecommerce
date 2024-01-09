import { toInstance } from '@common/mapping';

export class BaseCmd {
  static init<T extends BaseCmd>(this: new (...args: any[]) => T, data: T) {
    return toInstance(this, data);
  }
}

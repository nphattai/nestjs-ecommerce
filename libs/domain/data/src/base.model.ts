import { toInstance } from '@common/mapping';
import { Expose } from 'class-transformer';

export abstract class BaseModel {
  @Expose() id: number;
  @Expose() pid: string;
  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;

  static init<T extends BaseModel>(this: new (...args: unknown[]) => T, data: ModelOptional<T>) {
    return toInstance(this, data);
  }
}

export type ModelOptional<Model extends BaseModel, Key extends keyof Model = never> = ExcludeMethods<
  PickOptional<Model, 'updatedAt' | 'createdAt' | 'id' | 'pid' | Key>
>;

export type ExcludeMethods<T> = Pick<T, NonMethodProps<T>>;

export type PickOptional<Type, Key extends keyof Type> = Omit<Type, Key> & Partial<Pick<Type, Key>>;

type NonMethodProps<T> = {
  [K in keyof T]: T[K] extends (...args: unknown[]) => unknown ? never : K;
}[keyof T];

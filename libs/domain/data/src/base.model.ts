export abstract class BaseModel {
  id: number;
  pid: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ModelOptional<Model extends BaseModel, Key extends keyof Model = never> = ExcludeMethods<
  PickOptional<Model, 'updatedAt' | 'createdAt' | 'id' | 'pid' | Key>
>;

export type ExcludeMethods<T> = Pick<T, NonMethodProps<T>>;

export type PickOptional<Type, Key extends keyof Type> = Omit<Type, Key> & Partial<Pick<Type, Key>>;

type NonMethodProps<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];

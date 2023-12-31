import { ClassConstructor, plainToInstance } from 'class-transformer';

export function toInstance<C, P>(cls: ClassConstructor<C>, plain: P): C {
  const instance = plainToInstance<C, P>(cls, plain);

  return instance;
}

import { toInstance } from '@common/mapping';
import { BaseModel, ModelOptional } from '@domain/data';
import { Expose } from 'class-transformer';

export class User extends BaseModel {
  @Expose() password: string;
  @Expose() firstName: string;
  @Expose() lastName: string;
  @Expose() phone: string;
  @Expose() email: string;

  static from(o: ModelOptional<User, 'password' | 'firstName' | 'lastName' | 'phone'>) {
    return toInstance(User, o);
  }
}

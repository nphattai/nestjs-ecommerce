import { toInstance } from '@common/mapping';
import { BaseModel, ModelOptional } from '@domain/data';
import { Expose } from 'class-transformer';

export class UserAddress extends BaseModel {
  @Expose() userId: number;
  @Expose() address: string;
  @Expose() city: string;
  @Expose() postalCode: string;
  @Expose() country: string;
  @Expose() phone: string;

  static from(o: ModelOptional<UserAddress>) {
    return toInstance(UserAddress, o);
  }
}

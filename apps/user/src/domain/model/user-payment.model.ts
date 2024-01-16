import { toInstance } from '@common/mapping';
import { BaseModel, ModelOptional } from '@domain/data';
import { Expose } from 'class-transformer';

export class UserPayment extends BaseModel {
  @Expose() userId: number;
  @Expose() provider: number;
  @Expose() accountNo: string;

  static from(o: ModelOptional<UserPayment>) {
    return toInstance(UserPayment, o);
  }
}

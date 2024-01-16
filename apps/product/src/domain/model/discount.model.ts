import { toInstance } from '@common/mapping';
import { BaseModel, ModelOptional } from '@domain/data';
import { Expose } from 'class-transformer';

export class Discount extends BaseModel {
  @Expose() name: string;
  @Expose() description: string;
  @Expose() discountPercent: number;
  @Expose() active: boolean;
  @Expose() deletedAt: Date;

  static from(o: ModelOptional<Discount, 'description' | 'deletedAt'>) {
    return toInstance(Discount, o);
  }
}

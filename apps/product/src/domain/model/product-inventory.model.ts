import { toInstance } from '@common/mapping';
import { BaseModel, ModelOptional } from '@domain/data';
import { Expose } from 'class-transformer';

export class ProductInventory extends BaseModel {
  @Expose() quantity: number;
  @Expose() deletedAt: Date;

  static from(o: ModelOptional<ProductInventory, 'deletedAt'>) {
    return toInstance(ProductInventory, o);
  }
}

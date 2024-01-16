import { toInstance } from '@common/mapping';
import { BaseModel, ModelOptional } from '@domain/data';
import { Expose } from 'class-transformer';

export class Product extends BaseModel {
  @Expose() name: string;
  @Expose() description: string;
  @Expose() sku: string;
  @Expose() price: number;
  @Expose() categoryId: number;
  @Expose() inventoryId: number;
  @Expose() discountId: number;
  @Expose() deletedAt: Date;

  static from(o: ModelOptional<Product, 'description' | 'sku' | 'discountId' | 'deletedAt'>) {
    return toInstance(Product, o);
  }
}

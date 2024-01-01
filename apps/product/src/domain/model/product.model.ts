import { toInstance } from '@common/mapping';
import { BaseModel, ModelOptional } from '@domain/data';
import { Expose } from 'class-transformer';

export class Product extends BaseModel {
  @Expose() name: string;
  @Expose() description: string;
  @Expose() price: number;

  static from(o: ModelOptional<Product, 'name' | 'description' | 'price'>) {
    return toInstance(Product, o);
  }
}

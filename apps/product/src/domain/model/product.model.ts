import { toInstance } from '@common/mapping';
import { BaseModel, ModelOptional } from '@domain/data';

export class Product extends BaseModel {
  name: string;
  description: string;
  price: number;

  static from(o: ModelOptional<Product, 'name' | 'description' | 'price'>) {
    return toInstance(Product, o);
  }
}

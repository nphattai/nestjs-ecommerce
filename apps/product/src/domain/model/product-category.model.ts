import { toInstance } from '@common/mapping';
import { BaseModel, ModelOptional } from '@domain/data';
import { Expose } from 'class-transformer';

export class ProductCategory extends BaseModel {
  @Expose() name: string;
  @Expose() description: string;

  @Expose() deletedAt: Date;

  static from(o: ModelOptional<ProductCategory, 'description' | 'deletedAt'>) {
    return toInstance(ProductCategory, o);
  }
}

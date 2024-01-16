import { BaseQueryMany, IBaseRepository } from '@domain/storage';
import { Product } from '../../domain/model';

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');

export interface IProductRepository extends IBaseRepository<Product> {
  findByQuery(query: ProductQuery): Promise<{ total: number; data: Product[] }>;
}

export type ProductQuery = BaseQueryMany<Product> & {
  filter: BaseQueryMany<Product>['filter'] & {
    fromPrice?: number;
    toPrice?: number;
    isDiscount?: boolean;
  };
};

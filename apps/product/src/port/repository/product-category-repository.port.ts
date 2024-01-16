import { IBaseRepository } from '@domain/storage';
import { ProductCategory } from '../../domain/model';

export const PRODUCT_CATEGORY_REPOSITORY = Symbol('PRODUCT_CATEGORY_REPOSITORY');

export interface IProductCategoryRepository extends IBaseRepository<ProductCategory> {}

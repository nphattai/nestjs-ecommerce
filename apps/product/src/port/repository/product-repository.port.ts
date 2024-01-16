import { IBaseRepository } from '@domain/storage';
import { Product } from '../../domain/model';

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');

export interface IProductRepository extends IBaseRepository<Product> {}

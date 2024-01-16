import { IBaseRepository } from '@domain/storage';
import { Discount } from '../../domain/model';

export const DISCOUNT_REPOSITORY = Symbol('DISCOUNT_REPOSITORY');

export interface IDiscountRepository extends IBaseRepository<Discount> {}

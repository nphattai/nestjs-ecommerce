import { BaseQueryMany, IBaseRepository } from '@domain/storage';
import { Discount } from '../../domain/model';

export const DISCOUNT_REPOSITORY = Symbol('DISCOUNT_REPOSITORY');

export interface IDiscountRepository extends IBaseRepository<Discount> {
  findByQuery(query: DiscountQuery): Promise<{ total: number; data: Discount[] }>;
}

export type DiscountQuery = BaseQueryMany<Discount> & {
  filter: BaseQueryMany<Discount>['filter'] & {
    fromValue?: number;
    toValue?: number;
  };
};

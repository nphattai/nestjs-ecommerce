import { IBaseRepository } from '@domain/storage';
import { UserPayment } from '../../domain/model';

export const USER_PAYMENT_REPOSITORY = Symbol('USER_PAYMENT_REPOSITORY');

export interface IUserPaymentRepository extends IBaseRepository<UserPayment> {}

import { IBaseRepository } from '@domain/storage';
import { UserAddress } from '../../domain/model';

export const USER_ADDRESS_REPOSITORY = Symbol('USER_ADDRESS_REPOSITORY');

export interface IUserAddressRepository extends IBaseRepository<UserAddress> {}

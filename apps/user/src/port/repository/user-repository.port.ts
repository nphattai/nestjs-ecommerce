import { IBaseRepository } from '@domain/storage';
import { User } from '../../domain/model';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface IUserRepository extends IBaseRepository<User> {}

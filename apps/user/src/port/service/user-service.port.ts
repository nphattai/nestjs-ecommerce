import { BaseCmd, BaseDTO } from '@domain/data';
import { User, UserAddress, UserPayment } from '../../domain/model';
import { Expose } from 'class-transformer';

export const USER_SERVICE = Symbol('USER_SERVICE');

export interface IUserService {
  register(cmd: RegisterUserCmd): Promise<RegisterUserResult>;
  login(cmd: LoginUserCmd): Promise<LoginUserResult>;
  validate(cmd: ValidateUserCmd): Promise<User>;
  getUserInfo(cmd: GetUserInfoCmd): Promise<User>;
  updateUserInfo(cmd: UpdateUserCmd): Promise<User>;
  createUserAddress(cmd: CreateUserAddressCmd): Promise<UserAddress>;
  getUserAddressDetail(cmd: GetUserAddressDetailCmd): Promise<UserAddress>;
  getListUserAddress(cmd: GetListUserAddressCmd): Promise<UserAddress[]>;
  deleteUserAddress(cmd: DeleteUserAddressCmd): Promise<DeleteUserAddressResult>;
  createUserPayment(cmd: CreateUserPaymentCmd): Promise<UserPayment>;
  getUserPaymentDetail(cmd: GetUserPaymentDetailCmd): Promise<UserPayment>;
  getListUserPayment(cmd: GetListUserPaymentCmd): Promise<UserPayment[]>;
  deleteUserPayment(cmd: DeleteUserPaymentCmd): Promise<DeleteUserPaymentResult>;
}

export class RegisterUserCmd extends BaseCmd {
  @Expose() email: string;
  @Expose() password: string;
}

export class RegisterUserResult extends BaseDTO {
  @Expose() success: boolean;
  @Expose() message: string;
}

export type LoginUserCmd = {
  email: string;
  password: string;
};

export type LoginUserResult = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type ValidateUserCmd = {
  token: string;
};

export type GetUserInfoCmd = ValidateUserCmd & {};

export type UpdateUserCmd = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

export type CreateUserAddressCmd = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
};

export type GetUserAddressDetailCmd = {
  addressId: number;
};

export type DeleteUserAddressCmd = GetUserAddressDetailCmd & {};

export type GetListUserAddressCmd = ValidateUserCmd & {};

export type DeleteUserAddressResult = {
  success: boolean;
  message: string;
};

export type CreateUserPaymentCmd = {
  userId: number;
  provider: number;
  accountNo: string;
};

export type GetUserPaymentDetailCmd = {
  userPaymentId: number;
};

export type DeleteUserPaymentCmd = GetUserPaymentDetailCmd & {};

export type GetListUserPaymentCmd = ValidateUserCmd & {};

export type DeleteUserPaymentResult = {
  success: boolean;
  message: string;
};

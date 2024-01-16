import { UserDetailRes } from '@api/grpc/user';
import { fromDateToUnix } from '@common/datetime';
import { BaseCmd, BaseDTO } from '@domain/data';
import { Expose } from 'class-transformer';
import { User, UserAddress, UserPayment } from '../../domain/model';

export const USER_SERVICE = Symbol('USER_SERVICE');

export interface IUserService {
  register(cmd: RegisterUserCmd): Promise<RegisterUserResult>;
  login(cmd: LoginUserCmd): Promise<LoginUserResult>;
  getUserInfo(cmd: GetUserInfoCmd): Promise<GetUserInfoResult>;
  updateUserInfo(cmd: UpdateUserCmd): Promise<UpdateUserInfoResult>;
  createUserAddress(cmd: CreateUserAddressCmd): Promise<UserAddress>;
  getUserAddressDetail(cmd: GetUserAddressDetailCmd): Promise<UserAddress>;
  getListUserAddress(cmd: GetListUserAddressCmd): Promise<UserAddress[]>;
  deleteUserAddress(cmd: DeleteUserAddressCmd): Promise<DeleteUserAddressResult>;
  createUserPayment(cmd: CreateUserPaymentCmd): Promise<UserPayment>;
  getUserPaymentDetail(cmd: GetUserPaymentDetailCmd): Promise<UserPayment>;
  getListUserPayment(cmd: GetListUserPaymentCmd): Promise<UserPayment[]>;
  deleteUserPayment(cmd: DeleteUserPaymentCmd): Promise<DeleteUserPaymentResult>;
}

export class UserDetailResult extends BaseDTO {
  @Expose() firstName: string;
  @Expose() lastName: string;
  @Expose() phone: string;
  @Expose() email: string;
  @Expose() id: number;
  @Expose() pid: string;
  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;

  static toGrpc(userDetail: UserDetailResult): UserDetailRes {
    return {
      ...userDetail,
      createdAt: fromDateToUnix(userDetail.createdAt), //new Date(userDetail.createdAt).getTime(),
      updatedAt: fromDateToUnix(userDetail.updatedAt), // new Date(userDetail.updatedAt).getTime(),
    };
  }
}

export class GetUserInfoResult extends UserDetailResult {}

export class UpdateUserInfoResult extends UserDetailResult {}

export class RegisterUserCmd extends BaseCmd {
  @Expose() email: string;
  @Expose() password: string;
}

export class RegisterUserResult extends BaseDTO {
  @Expose() success: boolean;
  @Expose() message: string;
}

export class LoginUserCmd extends BaseCmd {
  @Expose() email: string;
  @Expose() password: string;
}

export class LoginUserResult extends BaseDTO {
  @Expose() user: User;
  @Expose() accessToken: string;
  @Expose() refreshToken: string;

  static toGrpc(res: LoginUserResult) {
    return {
      ...res,
      user: UserDetailResult.toGrpc(res.user),
    };
  }
}

export class ValidateUserCmd extends BaseCmd {
  @Expose() accessToken: string;
}

export class GetUserInfoCmd extends BaseCmd {
  @Expose() userId: number;
}

export class UpdateUserCmd extends BaseCmd {
  @Expose() id: number;
  @Expose() firstName?: string;
  @Expose() lastName?: string;
  @Expose() phone?: string;
  @Expose() email?: string;
}

export class CreateUserAddressCmd extends BaseCmd {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

export class GetUserAddressDetailCmd extends BaseCmd {
  addressId: number;
}

export class DeleteUserAddressCmd extends GetUserAddressDetailCmd {}

export class GetListUserAddressCmd extends ValidateUserCmd {}

export class DeleteUserAddressResult extends BaseDTO {
  success: boolean;
  message: string;
}

export class CreateUserPaymentCmd extends BaseCmd {
  userId: number;
  provider: number;
  accountNo: string;
}

export class GetUserPaymentDetailCmd extends BaseCmd {
  userPaymentId: number;
}

export class DeleteUserPaymentCmd extends GetUserPaymentDetailCmd {}

export class GetListUserPaymentCmd extends ValidateUserCmd {}

export class DeleteUserPaymentResult extends BaseDTO {
  success: boolean;
  message: string;
}

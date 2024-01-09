import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  CreateUserAddressCmd,
  CreateUserPaymentCmd,
  DeleteUserAddressResult,
  DeleteUserPaymentResult,
  GetUserAddressDetailCmd,
  GetUserPaymentDetailCmd,
  IUserService,
  LoginUserCmd,
  LoginUserResult,
  RegisterUserCmd,
  RegisterUserResult,
  UpdateUserCmd,
  ValidateUserCmd,
} from '../../port';
import { IUserRepository, USER_REPOSITORY } from '../../port/repository';
import { UserError, UserErrorMetadata, UserException } from '../exception';
import { User, UserAddress, UserPayment } from '../model';

@Injectable()
export class UserService implements IUserService {
  private logger: Logger;

  constructor(@Inject(USER_REPOSITORY) private readonly userRepo: IUserRepository) {
    this.logger = new Logger(UserService.name);
  }

  async register(cmd: RegisterUserCmd): Promise<RegisterUserResult> {
    this.logger.log(`Register user: ${JSON.stringify(cmd)}`);
    const userEntity = User.from({
      email: cmd.email,
      password: cmd.password,
    });

    const existingUser = await this.userRepo.findOne({ filter: { email: cmd.email } });

    if (existingUser) {
      throw new UserException(
        UserError.REGISTER_FAILED,
        { message: 'Email already exists' },
        UserErrorMetadata[UserError.REGISTER_FAILED]
      );
    }

    const user = await this.userRepo.insertOne(userEntity);

    this.logger.log(`User created: ${JSON.stringify(user)}`);

    return RegisterUserResult.init({ success: true, message: 'Register success' });
  }

  login(cmd: LoginUserCmd): Promise<LoginUserResult> {
    throw new Error('Method not implemented.');
  }
  validate(cmd: ValidateUserCmd): Promise<User> {
    throw new Error('Method not implemented.');
  }
  getUserInfo(cmd: ValidateUserCmd): Promise<User> {
    throw new Error('Method not implemented.');
  }
  updateUserInfo(cmd: UpdateUserCmd): Promise<User> {
    throw new Error('Method not implemented.');
  }
  createUserAddress(cmd: CreateUserAddressCmd): Promise<UserAddress> {
    throw new Error('Method not implemented.');
  }
  getUserAddressDetail(cmd: GetUserAddressDetailCmd): Promise<UserAddress> {
    throw new Error('Method not implemented.');
  }
  getListUserAddress(cmd: ValidateUserCmd): Promise<UserAddress[]> {
    throw new Error('Method not implemented.');
  }
  deleteUserAddress(cmd: GetUserAddressDetailCmd): Promise<DeleteUserAddressResult> {
    throw new Error('Method not implemented.');
  }
  createUserPayment(cmd: CreateUserPaymentCmd): Promise<UserPayment> {
    throw new Error('Method not implemented.');
  }
  getUserPaymentDetail(cmd: GetUserPaymentDetailCmd): Promise<UserPayment> {
    throw new Error('Method not implemented.');
  }
  getListUserPayment(cmd: ValidateUserCmd): Promise<UserPayment[]> {
    throw new Error('Method not implemented.');
  }
  deleteUserPayment(cmd: GetUserPaymentDetailCmd): Promise<DeleteUserPaymentResult> {
    throw new Error('Method not implemented.');
  }
}

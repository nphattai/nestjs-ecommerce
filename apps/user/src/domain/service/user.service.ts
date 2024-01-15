import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IUserConfig } from '@user/configuration';
import {
  CreateUserAddressCmd,
  CreateUserPaymentCmd,
  DeleteUserAddressResult,
  DeleteUserPaymentResult,
  GetUserAddressDetailCmd,
  GetUserInfoCmd,
  GetUserPaymentDetailCmd,
  IUserRepository,
  IUserService,
  LoginUserCmd,
  LoginUserResult,
  RegisterUserCmd,
  RegisterUserResult,
  USER_REPOSITORY,
  UpdateUserCmd,
  ValidateUserCmd,
} from '@user/port';
import { JWTPayload } from '@utils/jwt';
import { UserError, UserErrorMetadata, UserException } from '../exception';
import { User, UserAddress, UserPayment } from '../model';

@Injectable()
export class UserService implements IUserService {
  private logger: Logger;

  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: IUserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    this.logger = new Logger(UserService.name);
  }

  async register(cmd: RegisterUserCmd): Promise<RegisterUserResult> {
    this.logger.log(this.register.name, JSON.stringify(cmd));
    const userEntity = User.from({
      email: cmd.email,
      password: cmd.password,
    });

    // Check exiting account, if it exists, throw error
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

  async login(cmd: LoginUserCmd): Promise<LoginUserResult> {
    this.logger.log(this.login.name, JSON.stringify(cmd));
    const { email, password } = cmd;

    // Find existing account, if not found, throw error
    const user = await this.userRepo.findOne({ filter: { email } });
    if (!user) {
      throw new UserException(
        UserError.LOGIN_FAILED,
        { message: 'Email not found' },
        UserErrorMetadata[UserError.LOGIN_FAILED]
      );
    }

    // Compare password, if not match, throw error
    const isPasswordMatch = password === user.password;
    if (!isPasswordMatch) {
      throw new UserException(
        UserError.LOGIN_FAILED,
        { message: 'Password not match' },
        UserErrorMetadata[UserError.LOGIN_FAILED]
      );
    }

    // Generate access token
    const payload: JWTPayload = {
      email: user.email,
      userId: user.id,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<IUserConfig['jwt']['jwtAccessSecret']>('jwt.jwtAccessSecret'),
      expiresIn: this.configService.getOrThrow<IUserConfig['jwt']['jwtAccessExpiresIn']>('jwt.jwtAccessExpiresIn'),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<IUserConfig['jwt']['jwtRefreshSecret']>('jwt.jwtRefreshSecret'),
      expiresIn: this.configService.getOrThrow<IUserConfig['jwt']['jwtRefreshExpiresIn']>('jwt.jwtRefreshExpiresIn'),
    });

    return LoginUserResult.init({
      accessToken,
      refreshToken,
      user: user,
    });
  }

  async getUserInfo(cmd: GetUserInfoCmd): Promise<User> {
    this.logger.log(this.getUserInfo.name, JSON.stringify(cmd));
    const { userId } = cmd;

    const user = await this.userRepo.findOne({ filter: { id: userId } });
    if (!user) {
      throw new UserException(
        UserError.USER_NOT_FOUND,
        { message: 'User not found' },
        UserErrorMetadata[UserError.USER_NOT_FOUND]
      );
    }

    const { password, ...userInfo } = user;

    const result = User.from({ ...userInfo });

    return result;
  }

  async updateUserInfo(cmd: UpdateUserCmd): Promise<User> {
    this.logger.log(this.updateUserInfo.name, JSON.stringify({ cmd }));
    const { id, email, phone, firstName, lastName } = cmd;

    const user = await this.userRepo.findOne({ filter: { id } });
    if (!user) {
      throw new UserException(
        UserError.USER_NOT_FOUND,
        { message: 'User not found' },
        UserErrorMetadata[UserError.USER_NOT_FOUND]
      );
    }

    const updatedUser = await this.userRepo.updateOne({ id }, { email, phone, firstName, lastName });
    return updatedUser;
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

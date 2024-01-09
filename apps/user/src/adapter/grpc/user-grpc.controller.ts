import {
  GetUserInfoReq,
  LoginUserReq,
  LoginUserRes,
  RegisterUserReq,
  RegisterUserRes,
  UpdateUserInfoReq,
  User,
  UserServiceController,
  UserServiceControllerMethods,
  ValidateUserReq,
} from '@api/grpc/user';
import { Controller, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IUserService, RegisterUserCmd, USER_SERVICE } from '../../port';

@Controller()
@UserServiceControllerMethods()
export class UserGrpcController implements UserServiceController {
  constructor(@Inject(USER_SERVICE) private readonly userService: IUserService) {}

  register(request: RegisterUserReq): RegisterUserRes | Promise<RegisterUserRes> | Observable<RegisterUserRes> {
    const cmd = RegisterUserCmd.init({ email: request.email, password: request.password });
    return this.userService.register(cmd);
  }

  login(request: LoginUserReq): LoginUserRes | Promise<LoginUserRes> | Observable<LoginUserRes> {
    throw new Error('Method not implemented.');
  }
  validate(request: ValidateUserReq): User | Promise<User> | Observable<User> {
    throw new Error('Method not implemented.');
  }
  getUserInfo(request: GetUserInfoReq): User | Promise<User> | Observable<User> {
    throw new Error('Method not implemented.');
  }
  updateUserInfo(request: UpdateUserInfoReq): User | Promise<User> | Observable<User> {
    throw new Error('Method not implemented.');
  }
}

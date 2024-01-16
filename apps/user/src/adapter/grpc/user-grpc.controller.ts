import {
  GetUserInfoReq,
  LoginUserReq,
  RegisterUserReq,
  RegisterUserRes,
  UpdateUserInfoReq,
  UserServiceController,
  UserServiceControllerMethods,
} from '@api/grpc/user';
import { Controller, Inject } from '@nestjs/common';
import {
  GetUserInfoCmd,
  GetUserInfoResult,
  IUserService,
  LoginUserCmd,
  LoginUserResult,
  RegisterUserCmd,
  USER_SERVICE,
  UpdateUserCmd,
  UpdateUserInfoResult,
} from '@user/port';
import { Observable } from 'rxjs';

@Controller()
@UserServiceControllerMethods()
export class UserGrpcController implements UserServiceController {
  constructor(@Inject(USER_SERVICE) private readonly userService: IUserService) {}

  register(request: RegisterUserReq): RegisterUserRes | Promise<RegisterUserRes> | Observable<RegisterUserRes> {
    const cmd = RegisterUserCmd.init({ email: request.email, password: request.password });
    return this.userService.register(cmd);
  }

  async login(request: LoginUserReq) {
    const cmd = LoginUserCmd.init({ email: request.email, password: request.password });
    const result = await this.userService.login(cmd);

    return LoginUserResult.toGrpc(result);
  }

  async getUserInfo(request: GetUserInfoReq) {
    const cmd = GetUserInfoCmd.init({ userId: request.userId });
    const result = await this.userService.getUserInfo(cmd);

    return GetUserInfoResult.toGrpc(result);
  }

  async updateUserInfo(req: UpdateUserInfoReq) {
    const cmd = UpdateUserCmd.init({ ...req });
    const result = await this.userService.updateUserInfo(cmd);
    return UpdateUserInfoResult.toGrpc(result);
  }
}

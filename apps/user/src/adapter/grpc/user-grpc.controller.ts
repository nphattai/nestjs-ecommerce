import {
  HelloUserReq,
  HelloUserRes,
  UserServiceController,
  UserServiceControllerMethods,
} from '@api/grpc/user';
import { Controller, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HelloCmd, IUserService, USER_SERVICE } from '../../port';

@Controller()
@UserServiceControllerMethods()
export class UserGrpcController implements UserServiceController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService
  ) {}

  helloUser(
    request: HelloUserReq
  ): HelloUserRes | Promise<HelloUserRes> | Observable<HelloUserRes> {
    const cmd: HelloCmd = { name: request.name };
    const res = this.userService.hello(cmd);
    return res;
  }
}

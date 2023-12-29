import {
  RegisterReq,
  RegisterRes,
  UserServiceController,
  UserServiceControllerMethods,
} from '@api/grpc/user';
import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Controller()
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private readonly userService: UserService) {}

  register(
    request: RegisterReq
  ): RegisterRes | Observable<RegisterRes> | Promise<RegisterRes> {
    return this.userService.register(request);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterReq } from '@api/grpc/user';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() request: RegisterReq) {
    return this.userService.register(request);
  }
}

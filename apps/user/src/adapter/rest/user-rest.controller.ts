import { Body, Controller, Inject, Post } from '@nestjs/common';
import { HelloCmd, IUserService, USER_SERVICE } from '../../port';

@Controller()
export class UserRestController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService
  ) {}

  @Post('hello')
  async hello(@Body() req: HelloCmd) {
    return this.userService.hello(req);
  }
}

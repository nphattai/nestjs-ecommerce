import { Controller, Inject } from '@nestjs/common';
import { IUserService, USER_SERVICE } from '../../port';

@Controller()
export class UserRestController {
  constructor(@Inject(USER_SERVICE) private readonly userService: IUserService) {}
}

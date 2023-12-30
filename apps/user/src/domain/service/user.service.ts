import { Injectable } from '@nestjs/common';
import { HelloCmd, HelloRes, IUserService } from '../../port';

@Injectable()
export class UserService implements IUserService {
  hello(req: HelloCmd): HelloRes {
    return { message: `Hello User ${req.name}` };
  }
}

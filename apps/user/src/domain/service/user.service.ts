import { Injectable } from '@nestjs/common';
import { HelloCmd, HelloRes, IUserService } from '../../port';
import { UserError, UserErrorMetadata, UserException } from '../error';

@Injectable()
export class UserService implements IUserService {
  hello(req: HelloCmd): HelloRes {
    throw new UserException(
      UserError.COMMON_ERROR,
      { message: 'hello user failed', details: { name: req.name } },
      UserErrorMetadata[UserError.COMMON_ERROR]
    );

    return { message: `Hello User ${req.name}` };
  }
}

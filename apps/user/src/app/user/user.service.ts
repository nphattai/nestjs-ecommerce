import { RegisterReq, RegisterRes } from '@api/grpc/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor() {}
  register(request: RegisterReq) {
    const { username, password } = request;

    console.log(`username: ${username}, password: ${password}`);

    const result: RegisterRes = {
      code: 200,
      message: 'success',
    };

    return result;
  }
}

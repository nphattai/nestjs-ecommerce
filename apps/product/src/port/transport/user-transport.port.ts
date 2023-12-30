import { HelloUserReq, HelloUserRes } from '@api/grpc/user';

export const USER_TRANSPORT = Symbol('USER_TRANSPORT');

export interface IUserTransport {
  helloUser(req: HelloUserReq): Promise<HelloUserRes>;
}

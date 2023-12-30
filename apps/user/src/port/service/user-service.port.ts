export const USER_SERVICE = Symbol('USER_SERVICE');

export interface IUserService {
  hello(req: HelloCmd): HelloRes;
}

export type HelloCmd = { name: string };

export type HelloRes = { message: string };

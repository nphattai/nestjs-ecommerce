/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export interface UserDetailRes {
  id: number;
  email: string;
  phone?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  pid: string;
  createdAt: number;
  updatedAt: number;
}

export interface RegisterUserReq {
  email: string;
  password: string;
}

export interface RegisterUserRes {
  success: boolean;
  message: string;
}

export interface LoginUserReq {
  email: string;
  password: string;
}

export interface LoginUserRes {
  user: UserDetailRes | undefined;
  accessToken: string;
  refreshToken: string;
}

export interface GetUserInfoReq {
  userId: number;
}

export interface GetUserInfoRes {
  user: UserDetailRes | undefined;
}

export interface UpdateUserInfoReq {
  id: number;
  firstName?: string | undefined;
  lastName?: string | undefined;
  phone?: string | undefined;
  email?: string | undefined;
}

export const USER_PACKAGE_NAME = 'user';

export interface UserServiceClient {
  register(request: RegisterUserReq): Observable<RegisterUserRes>;

  login(request: LoginUserReq): Observable<LoginUserRes>;

  getUserInfo(request: GetUserInfoReq): Observable<UserDetailRes>;

  updateUserInfo(request: UpdateUserInfoReq): Observable<UserDetailRes>;
}

export interface UserServiceController {
  register(request: RegisterUserReq): Promise<RegisterUserRes> | Observable<RegisterUserRes> | RegisterUserRes;

  login(request: LoginUserReq): Promise<LoginUserRes> | Observable<LoginUserRes> | LoginUserRes;

  getUserInfo(request: GetUserInfoReq): Promise<UserDetailRes> | Observable<UserDetailRes> | UserDetailRes;

  updateUserInfo(request: UpdateUserInfoReq): Promise<UserDetailRes> | Observable<UserDetailRes> | UserDetailRes;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['register', 'login', 'getUserInfo', 'updateUserInfo'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('UserService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('UserService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = 'UserService';

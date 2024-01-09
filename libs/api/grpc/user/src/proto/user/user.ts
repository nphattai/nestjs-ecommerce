/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
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
  user: User | undefined;
  accessToken: string;
  refreshToken: string;
}

export interface ValidateUserReq {
  accessToken: string;
}

export interface GetUserInfoReq {
  accessToken: string;
}

export interface UpdateUserInfoReq {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export const USER_PACKAGE_NAME = 'user';

export interface UserServiceClient {
  register(request: RegisterUserReq): Observable<RegisterUserRes>;

  login(request: LoginUserReq): Observable<LoginUserRes>;

  validate(request: ValidateUserReq): Observable<User>;

  getUserInfo(request: GetUserInfoReq): Observable<User>;

  updateUserInfo(request: UpdateUserInfoReq): Observable<User>;
}

export interface UserServiceController {
  register(request: RegisterUserReq): Promise<RegisterUserRes> | Observable<RegisterUserRes> | RegisterUserRes;

  login(request: LoginUserReq): Promise<LoginUserRes> | Observable<LoginUserRes> | LoginUserRes;

  validate(request: ValidateUserReq): Promise<User> | Observable<User> | User;

  getUserInfo(request: GetUserInfoReq): Promise<User> | Observable<User> | User;

  updateUserInfo(request: UpdateUserInfoReq): Promise<User> | Observable<User> | User;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['register', 'login', 'validate', 'getUserInfo', 'updateUserInfo'];
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

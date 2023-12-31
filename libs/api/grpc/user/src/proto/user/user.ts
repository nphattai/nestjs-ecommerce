/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export interface HelloUserReq {
  name: string;
}

export interface HelloUserRes {
  message: string;
}

export const USER_PACKAGE_NAME = 'user';

export interface UserServiceClient {
  helloUser(request: HelloUserReq): Observable<HelloUserRes>;
}

export interface UserServiceController {
  helloUser(
    request: HelloUserReq
  ): Promise<HelloUserRes> | Observable<HelloUserRes> | HelloUserRes;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['helloUser'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const USER_SERVICE_NAME = 'UserService';

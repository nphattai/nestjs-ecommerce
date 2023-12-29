/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";


export interface RegisterReq {
  username: string;
  password: string;
}

export interface RegisterRes {
  code: number;
  message: string;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  register(request: RegisterReq): Observable<RegisterRes>;
}

export interface UserServiceController {
  register(request: RegisterReq): Promise<RegisterRes> | Observable<RegisterRes> | RegisterRes;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["register"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";

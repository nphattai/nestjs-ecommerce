/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export interface HelloProductReq {
  name: string;
}

export interface HelloProductRes {
  message: string;
}

export const PRODUCT_PACKAGE_NAME = 'product';

export interface ProductServiceClient {
  helloProduct(request: HelloProductReq): Observable<HelloProductRes>;
}

export interface ProductServiceController {
  helloProduct(request: HelloProductReq): Promise<HelloProductRes> | Observable<HelloProductRes> | HelloProductRes;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['helloProduct'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('ProductService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('ProductService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PRODUCT_SERVICE_NAME = 'ProductService';

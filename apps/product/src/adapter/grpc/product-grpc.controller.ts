import {
  HelloProductReq,
  HelloProductRes,
  ProductServiceController,
  ProductServiceControllerMethods,
} from '@api/grpc/product';
import { Controller, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HelloCmd, IProductService, PRODUCT_SERVICE } from '../../port';

@Controller()
@ProductServiceControllerMethods()
export class ProductGrpcController implements ProductServiceController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productService: IProductService
  ) {}

  helloProduct(
    request: HelloProductReq
  ): HelloProductRes | Promise<HelloProductRes> | Observable<HelloProductRes> {
    const cmd: HelloCmd = { name: request.name };

    return this.productService.hello(cmd);
  }
}

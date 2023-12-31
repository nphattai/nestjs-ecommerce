import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateProductCmd, HelloCmd, IProductService, PRODUCT_SERVICE } from '../../port';

@Controller()
export class ProductRestController {
  constructor(@Inject(PRODUCT_SERVICE) private readonly productService: IProductService) {}

  @Post('hello')
  async hello(@Body() req: HelloCmd) {
    return this.productService.hello(req);
  }

  @Post('hello-user')
  async helloUser(@Body() req: HelloCmd) {
    return this.productService.helloUser(req);
  }

  @Post('create')
  async create(@Body() req: CreateProductCmd) {
    return this.productService.createProduct(req);
  }
}

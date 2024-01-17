import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CreateProductDto } from './dto';
import { GrpcProductTransport } from './grpc-product.transport';

@Controller('product')
export class ProductController {
  private logger: Logger;

  constructor(private readonly productTransport: GrpcProductTransport) {
    this.logger = new Logger(ProductController.name);
  }

  @Post('/')
  async createProduct(@Body() dto: CreateProductDto) {
    return this.productTransport.createProduct({ ...dto });
  }
}

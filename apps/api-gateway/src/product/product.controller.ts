import { Controller, Get, Logger, Query, UseGuards } from '@nestjs/common';
import { AuthUserGuard } from '../guard';
import { FindProductDto } from './dto';
import { GrpcProductTransport } from './grpc-product.transport';

@Controller('product')
export class ProductController {
  private logger: Logger;

  constructor(private readonly productTransport: GrpcProductTransport) {
    this.logger = new Logger(ProductController.name);
  }

  @UseGuards(AuthUserGuard)
  @Get('/')
  async findProduct(@Query() dto: any) {
    return this.productTransport.findProduct({ ...dto });
  }
}

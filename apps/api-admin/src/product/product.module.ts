import { PRODUCT_CLIENT, productClient } from '@api/grpc/product';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { GrpcProductTransport } from './grpc-product.transport';
import { ProductController } from './product.controller';

@Module({
  imports: [ClientsModule.register([{ name: PRODUCT_CLIENT, ...productClient }])],
  providers: [GrpcProductTransport],
  controllers: [ProductController],
})
export class ProductModule {}

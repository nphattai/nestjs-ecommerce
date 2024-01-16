import { PRODUCT_CLIENT, productClient } from '@api/grpc/product';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { GrpcProductTransport } from './grpc-product.transport';
import { ProductController } from './product.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [ClientsModule.register([{ name: PRODUCT_CLIENT, ...productClient }]), UserModule],
  providers: [GrpcProductTransport],
  controllers: [ProductController],
})
export class ProductModule {}

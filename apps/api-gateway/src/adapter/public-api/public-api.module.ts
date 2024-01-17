import { Module } from '@nestjs/common';
import { GrpcProductTransportModule } from 'libs/product/src';
import { GrpcUserTransportModule } from 'libs/user/src';
import { UserController } from './controller';
import { ProductController } from './controller/product.controller';

@Module({
  imports: [GrpcUserTransportModule, GrpcProductTransportModule],
  controllers: [UserController, ProductController],
})
export class PublicApiModule {}

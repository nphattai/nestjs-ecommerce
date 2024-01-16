import { Module } from '@nestjs/common';
import { ProductModule } from '@product/domain';
import { ProductGrpcController } from './product-grpc.controller';

@Module({
  imports: [ProductModule],
  controllers: [ProductGrpcController],
})
export class ProductGrpcModule {}

import { Module } from '@nestjs/common';
import { ProductGrpcController } from './product-grpc.controller';
import { ProductModule } from '../../domain';

@Module({
  imports: [ProductModule],
  controllers: [ProductGrpcController],
})
export class ProductGrpcModule {}

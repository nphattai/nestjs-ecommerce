import { Module } from '@nestjs/common';
import { ProductRestModule } from './adapter/rest/product-rest.module';
import { ProductGrpcModule } from './adapter/grpc/product-grpc.module';

@Module({
  imports: [ProductRestModule, ProductGrpcModule],
  providers: [],
})
export class AppModule {}

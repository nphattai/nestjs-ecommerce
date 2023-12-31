import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductGrpcModule } from './adapter/grpc/product-grpc.module';
import { ProductRestModule } from './adapter/rest/product-rest.module';
import configuration from './configuration';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration] }), ProductRestModule, ProductGrpcModule],
  providers: [],
})
export class AppModule {}

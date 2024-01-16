import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductGrpcModule } from './adapter/grpc/product-grpc.module';
import configuration from './configuration';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration] }), ProductGrpcModule],
  providers: [],
})
export class AppModule {}

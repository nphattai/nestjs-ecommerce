import { PRODUCT_CLIENT, productClient } from '@api/grpc/product';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { GrpcProductTransport } from './grpc-transport';

@Module({
  imports: [ClientsModule.register([{ name: PRODUCT_CLIENT, ...productClient }])],
  providers: [GrpcProductTransport],
  exports: [GrpcProductTransport],
})
export class GrpcProductTransportModule {}

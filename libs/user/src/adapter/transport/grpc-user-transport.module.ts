import { USER_CLIENT, userClient } from '@api/grpc/user';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { GrpcUserTransport } from './grpc-transport';

@Module({
  imports: [ClientsModule.register([{ name: USER_CLIENT, ...userClient }])],
  providers: [GrpcUserTransport],
  exports: [GrpcUserTransport],
})
export class GrpcUserTransportModule {}

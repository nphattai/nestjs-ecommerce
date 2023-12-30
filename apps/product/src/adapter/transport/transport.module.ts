import { USER_CLIENT, userClient } from '@api/grpc/user';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { USER_TRANSPORT } from '../../port';
import { GrpcUserTransport } from './user.transport';

@Module({
  imports: [ClientsModule.register([{ name: USER_CLIENT, ...userClient }])],
  providers: [{ provide: USER_TRANSPORT, useClass: GrpcUserTransport }],
  exports: [{ provide: USER_TRANSPORT, useClass: GrpcUserTransport }],
})
export class TransportModule {}

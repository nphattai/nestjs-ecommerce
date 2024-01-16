import { USER_CLIENT, userClient } from '@api/grpc/user';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { GrpcUserTransport } from './grpc-user.transport';
import { UserController } from './user.controller';

@Module({
  imports: [ClientsModule.register([{ name: USER_CLIENT, ...userClient }])],
  providers: [GrpcUserTransport],
  exports: [GrpcUserTransport],
  controllers: [UserController],
})
export class UserModule {}

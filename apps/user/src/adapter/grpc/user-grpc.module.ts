import { Module } from '@nestjs/common';
import { UserGrpcController } from './user-grpc.controller';
import { UserModule } from '../../domain';

@Module({
  imports: [UserModule],
  controllers: [UserGrpcController],
})
export class UserGrpcModule {}

import { Module } from '@nestjs/common';
import { UserGrpcModule } from './adapter/grpc/user-grpc.module';
import { UserRestModule } from './adapter/rest/user-rest.module';

@Module({
  imports: [UserRestModule, UserGrpcModule],
})
export class AppModule {}

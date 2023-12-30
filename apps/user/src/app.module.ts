import { Module } from '@nestjs/common';
import { UserRestModule } from './adapter/rest/user-rest.module';
import { UserGrpcModule } from './adapter/grpc/user-grpc.module';

@Module({
  imports: [UserRestModule, UserGrpcModule],
  providers: [],
})
export class AppModule {}

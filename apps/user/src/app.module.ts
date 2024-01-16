import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserGrpcModule } from './adapter/grpc/user-grpc.module';
import { UserRestModule } from './adapter/rest/user-rest.module';
import configuration from './configuration';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration] }), UserRestModule, UserGrpcModule],
})
export class AppModule {}

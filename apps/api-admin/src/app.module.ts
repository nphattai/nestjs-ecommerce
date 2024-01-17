import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import configuration from './configuration';
import { PublicApiModule } from './adapter/public-api';

@Module({
  imports: [
    JwtModule.register({ global: true }),
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    PublicApiModule,
  ],
})
export class AppModule {}

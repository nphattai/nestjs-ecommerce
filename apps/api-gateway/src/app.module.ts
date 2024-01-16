import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import configuration from './configuration';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({ global: true }),
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
  ],
})
export class AppModule {}

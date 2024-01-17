import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import configuration from './configuration';
import { ProductModule } from './product';

@Module({
  imports: [
    JwtModule.register({ global: true }),
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ProductModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import configuration from './configuration';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    JwtModule.register({ global: true }),
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    UserModule,
    ProductModule,
  ],
})
export class AppModule {}

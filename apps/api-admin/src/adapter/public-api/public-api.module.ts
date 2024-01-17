import { Module } from '@nestjs/common';
import { GrpcProductTransportModule } from 'libs/product/src';
import { ProductController } from './controller';

@Module({
  imports: [GrpcProductTransportModule],
  controllers: [ProductController],
})
export class PublicApiModule {}

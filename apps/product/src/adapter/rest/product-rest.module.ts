import { Module } from '@nestjs/common';
import { ProductRestController } from './product-rest.controller';
import { ProductModule } from '../../domain';

@Module({
  imports: [ProductModule],
  controllers: [ProductRestController],
})
export class ProductRestModule {}

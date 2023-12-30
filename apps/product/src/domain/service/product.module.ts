import { Module } from '@nestjs/common';
import { PRODUCT_SERVICE } from '../../port';
import { ProductService } from './product.service';
import { TransportModule } from '../../adapter/transport/transport.module';

@Module({
  imports: [TransportModule],
  providers: [{ provide: PRODUCT_SERVICE, useClass: ProductService }],
  exports: [{ provide: PRODUCT_SERVICE, useClass: ProductService }],
})
export class ProductModule {}

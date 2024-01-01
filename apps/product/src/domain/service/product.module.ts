import { Module } from '@nestjs/common';
import { ProductStorageModule } from '../../adapter/storage';
import { TransportModule } from '../../adapter/transport';
import { PRODUCT_SERVICE } from '../../port';
import { ProductService } from './product.service';

@Module({
  imports: [TransportModule, ProductStorageModule],
  providers: [{ provide: PRODUCT_SERVICE, useClass: ProductService }],
  exports: [{ provide: PRODUCT_SERVICE, useClass: ProductService }],
})
export class ProductModule {}

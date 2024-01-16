import { Module } from '@nestjs/common';
import { ProductStorageModule } from '../../adapter/storage';
import { PRODUCT_SERVICE } from '../../port';
import { ProductService } from './product.service';

@Module({
  imports: [ProductStorageModule],
  providers: [{ provide: PRODUCT_SERVICE, useClass: ProductService }],
  exports: [{ provide: PRODUCT_SERVICE, useClass: ProductService }],
})
export class ProductModule {}

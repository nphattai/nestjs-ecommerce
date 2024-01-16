import { PGPrimaryConfigService } from '@domain/storage';
import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DISCOUNT_REPOSITORY,
  PRODUCT_CATEGORY_REPOSITORY,
  PRODUCT_INVENTORY_REPOSITORY,
  PRODUCT_REPOSITORY,
} from '@product/port';
import { DiscountEntity, ProductCategoryEntity, ProductInventoryEntity, ProductEntity } from './entities';
import {
  DiscountRepository,
  ProductCategoryRepository,
  ProductInventoryRepository,
  ProductRepository,
} from './repository';

const RepositoryRegisters: Provider[] = [
  { provide: PRODUCT_REPOSITORY, useClass: ProductRepository },
  { provide: PRODUCT_CATEGORY_REPOSITORY, useClass: ProductCategoryRepository },
  { provide: PRODUCT_INVENTORY_REPOSITORY, useClass: ProductInventoryRepository },
  { provide: DISCOUNT_REPOSITORY, useClass: DiscountRepository },
];

const Entities = [ProductEntity, ProductCategoryEntity, ProductInventoryEntity, DiscountEntity];

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: PGPrimaryConfigService }), TypeOrmModule.forFeature([...Entities])],
  providers: [...RepositoryRegisters],
  exports: [...RepositoryRegisters],
})
export class ProductStorageModule {}

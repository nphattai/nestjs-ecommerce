import { PGPrimaryConfigService } from '@domain/storage';
import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PRODUCT_REPOSITORY } from '../../port/repository/product-repository.port';
import { ProductEntity } from './entities/product.entity';
import { ProductRepository } from './repository/product.repository';

const RepositoryRegisters: Provider[] = [{ provide: PRODUCT_REPOSITORY, useClass: ProductRepository }];

const Entities = [ProductEntity];

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: PGPrimaryConfigService }), TypeOrmModule.forFeature([...Entities])],
  providers: [...RepositoryRegisters],
  exports: [...RepositoryRegisters],
})
export class ProductStorageModule {}

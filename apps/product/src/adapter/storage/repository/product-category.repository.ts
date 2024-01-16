import { PGBaseRepository } from '@domain/storage';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductCategoryRepository } from 'apps/product/src/port';
import { Repository } from 'typeorm';
import { ProductCategoryEntity } from '../entities';
import { ProductCategory } from 'apps/product/src/domain/model';

export class ProductCategoryRepository
  extends PGBaseRepository<ProductCategoryEntity, ProductCategory>
  implements IProductCategoryRepository
{
  constructor(
    @InjectRepository(ProductCategoryEntity) private readonly productCategoryRepo: Repository<ProductCategoryEntity>
  ) {
    super(productCategoryRepo, new Logger(ProductCategoryRepository.name));
  }

  _entityToModel(entity: ProductCategoryEntity): ProductCategory {
    return ProductCategory.from(entity);
  }
}

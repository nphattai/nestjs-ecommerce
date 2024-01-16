import { PGBaseRepository } from '@domain/storage';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductInventory } from 'apps/product/src/domain/model';
import { IProductInventoryRepository } from 'apps/product/src/port';
import { Repository } from 'typeorm';
import { ProductInventoryEntity } from '../entities';

export class ProductInventoryRepository
  extends PGBaseRepository<ProductInventoryEntity, ProductInventory>
  implements IProductInventoryRepository
{
  constructor(
    @InjectRepository(ProductInventoryEntity) private readonly productInventoryRepo: Repository<ProductInventoryEntity>
  ) {
    super(productInventoryRepo, new Logger(ProductInventoryRepository.name));
  }

  _entityToModel(entity: ProductInventoryEntity): ProductInventory {
    return ProductInventory.from(entity);
  }
}

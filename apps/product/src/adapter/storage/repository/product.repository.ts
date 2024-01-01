import { PGBaseRepository } from '@domain/storage';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../../domain/model/product.model';
import { IProductRepository } from '../../../port/repository/product-repository.port';
import { ProductEntity } from '../entities/product.entity';

export class ProductRepository extends PGBaseRepository<ProductEntity, Product> implements IProductRepository {
  constructor(@InjectRepository(ProductEntity) private readonly productRepo: Repository<ProductEntity>) {
    super(productRepo);
  }

  _entityToModel(entity: ProductEntity): Product {
    return Product.from(entity);
  }
}

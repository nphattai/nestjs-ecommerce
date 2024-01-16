import { PGBaseRepository, PGContext } from '@domain/storage';
import { Inject, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DISCOUNT_REPOSITORY, IDiscountRepository } from '@product/port';
import { Between, In, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Product } from '../../../domain/model/product.model';
import { IProductRepository, ProductQuery } from '../../../port/repository/product-repository.port';
import { ProductEntity } from '../entities/product.entity';

export class ProductRepository extends PGBaseRepository<ProductEntity, Product> implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity) private readonly productRepo: Repository<ProductEntity>,
    @Inject(DISCOUNT_REPOSITORY) private readonly discountRepo: IDiscountRepository
  ) {
    super(productRepo, new Logger(ProductRepository.name));
  }

  _entityToModel(entity: ProductEntity): Product {
    return Product.from(entity);
  }

  async findByQuery(query: ProductQuery, ctx?: PGContext): Promise<{ total: number; data: Product[] }> {
    const { fromPrice, toPrice, isDiscount, ...filter } = query.filter;

    let options = this.craftFindOption({ ...query, filter });

    if (fromPrice) {
      options = this.extendWhere(options, { price: MoreThanOrEqual(fromPrice) });
    }

    if (toPrice) {
      options = this.extendWhere(options, { price: LessThanOrEqual(toPrice) });
    }

    if (fromPrice && toPrice) {
      options = this.extendWhere(options, { price: Between(toPrice, fromPrice) });
    }

    if (isDiscount) {
      const discountIdRes = await this.discountRepo.findByQuery({ filter: { fromValue: 0 } });
      options = this.extendWhere(options, { discountId: In(discountIdRes.data) });
    }

    const result = ctx?.manager
      ? await ctx.manager.find(this.repo.target, options)
      : await this.productRepo.find(options);

    const total = await this.productRepo.count(options);

    return { total, data: result.map((r) => this._entityToModel(r)) };
  }
}

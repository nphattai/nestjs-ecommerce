import { PGBaseRepository, PGContext } from '@domain/storage';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Discount } from '@product/domain/model';
import { DiscountQuery, IDiscountRepository } from '@product/port';
import { DiscountEntity } from '../entities';

export class DiscountRepository extends PGBaseRepository<DiscountEntity, Discount> implements IDiscountRepository {
  constructor(@InjectRepository(DiscountEntity) private readonly discountRepo: Repository<DiscountEntity>) {
    super(discountRepo, new Logger(DiscountRepository.name));
  }

  _entityToModel(entity: DiscountEntity): Discount {
    return Discount.from(entity);
  }

  async findByQuery(query: DiscountQuery, ctx?: PGContext): Promise<{ data: Discount[]; total: number }> {
    const { fromValue, toValue, ...filter } = query.filter;

    let options = this.craftFindOption({ ...query, filter });

    if (fromValue) {
      options = this.extendWhere(options, { discountPercent: MoreThanOrEqual(fromValue) });
    }

    if (toValue) {
      options = this.extendWhere(options, { discountPercent: LessThanOrEqual(toValue) });
    }

    if (fromValue && toValue) {
      options = this.extendWhere(options, { discountPercent: Between(fromValue, toValue) });
    }

    const result = ctx?.manager
      ? await ctx.manager.find(this.repo.target, options)
      : await this.discountRepo.find(options);

    const total = await this.discountRepo.count(options);

    return { data: result.map((r) => this._entityToModel(r)), total };
  }
}

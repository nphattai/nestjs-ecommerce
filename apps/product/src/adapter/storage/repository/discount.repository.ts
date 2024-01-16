import { PGBaseRepository } from '@domain/storage';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from '../../../domain/model';
import { IDiscountRepository } from '../../../port/repository';
import { DiscountEntity } from '../entities';

export class DiscountRepository extends PGBaseRepository<DiscountEntity, Discount> implements IDiscountRepository {
  constructor(@InjectRepository(DiscountEntity) private readonly productRepo: Repository<DiscountEntity>) {
    super(productRepo, new Logger(DiscountRepository.name));
  }

  _entityToModel(entity: DiscountEntity): Discount {
    return Discount.from(entity);
  }
}

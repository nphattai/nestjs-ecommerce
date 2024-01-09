import { PGBaseRepository } from '@domain/storage';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPayment } from 'apps/user/src/domain/model';
import { IUserPaymentRepository } from 'apps/user/src/port/repository';
import { Repository } from 'typeorm';
import { UserPaymentEntity } from '../entities/user-payment.entity';
import { UserEntity } from '../entities/user.entity';

export class UserPaymentRepository
  extends PGBaseRepository<UserPaymentEntity, UserPayment>
  implements IUserPaymentRepository
{
  constructor(@InjectRepository(UserEntity) private readonly userPaymentRepo: Repository<UserPaymentEntity>) {
    super(userPaymentRepo, new Logger(UserPaymentRepository.name));
  }

  _entityToModel(entity: UserPaymentEntity): UserPayment {
    return UserPayment.from(entity);
  }
}

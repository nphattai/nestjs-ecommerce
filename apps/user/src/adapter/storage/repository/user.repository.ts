import { PGBaseRepository } from '@domain/storage';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'apps/user/src/domain/model';
import { IUserRepository } from 'apps/user/src/port/repository';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export class UserRepository extends PGBaseRepository<UserEntity, User> implements IUserRepository {
  constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>) {
    super(userRepo, new Logger(UserRepository.name));
  }

  _entityToModel(entity: UserEntity): User {
    return User.from(entity);
  }
}

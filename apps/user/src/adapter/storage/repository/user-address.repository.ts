import { PGBaseRepository } from '@domain/storage';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAddress } from 'apps/user/src/domain/model';
import { IUserAddressRepository } from 'apps/user/src/port/repository';
import { Repository } from 'typeorm';
import { UserAddressEntity } from '../entities/user-address.entity';
import { UserEntity } from '../entities/user.entity';

export class UserAddressRepository
  extends PGBaseRepository<UserAddressEntity, UserAddress>
  implements IUserAddressRepository
{
  constructor(@InjectRepository(UserEntity) private readonly userAddressRepo: Repository<UserAddressEntity>) {
    super(userAddressRepo, new Logger(UserAddressRepository.name));
  }

  _entityToModel(entity: UserAddressEntity): UserAddress {
    return UserAddress.from(entity);
  }
}

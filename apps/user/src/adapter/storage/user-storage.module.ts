import { PGPrimaryConfigService } from '@domain/storage';
import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USER_ADDRESS_REPOSITORY, USER_PAYMENT_REPOSITORY, USER_REPOSITORY } from '../../port/repository';
import { UserAddressEntity, UserEntity, UserPaymentEntity } from './entities';
import { UserAddressRepository, UserPaymentRepository, UserRepository } from './repository';

const RepositoryRegisters: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
  { provide: USER_ADDRESS_REPOSITORY, useClass: UserAddressRepository },
  { provide: USER_PAYMENT_REPOSITORY, useClass: UserPaymentRepository },
];

const Entities = [UserEntity, UserAddressEntity, UserPaymentEntity];

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: PGPrimaryConfigService }), TypeOrmModule.forFeature([...Entities])],
  providers: [...RepositoryRegisters],
  exports: [...RepositoryRegisters],
})
export class UserStorageModule {}

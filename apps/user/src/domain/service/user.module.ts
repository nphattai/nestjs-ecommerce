import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { USER_SERVICE } from '../../port';
import { UserStorageModule } from '../../adapter/storage/user-storage.module';

@Module({
  imports: [UserStorageModule],
  providers: [{ provide: USER_SERVICE, useClass: UserService }],
  exports: [{ provide: USER_SERVICE, useClass: UserService }],
})
export class UserModule {}

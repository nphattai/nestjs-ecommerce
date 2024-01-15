import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserStorageModule } from '../../adapter/storage/user-storage.module';
import { USER_SERVICE } from '../../port';
import { UserService } from './user.service';

@Module({
  imports: [UserStorageModule, JwtModule],
  providers: [{ provide: USER_SERVICE, useClass: UserService }],
  exports: [{ provide: USER_SERVICE, useClass: UserService }],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { USER_SERVICE } from '../../port';

@Module({
  imports: [],
  providers: [{ provide: USER_SERVICE, useClass: UserService }],
  exports: [{ provide: USER_SERVICE, useClass: UserService }],
})
export class UserModule {}

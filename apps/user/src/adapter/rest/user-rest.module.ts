import { Module } from '@nestjs/common';
import { UserRestController } from './user-rest.controller';
import { UserModule } from '../../domain';

@Module({
  imports: [UserModule],
  controllers: [UserRestController],
})
export class UserRestModule {}

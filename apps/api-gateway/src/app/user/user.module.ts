import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientsModule } from '@nestjs/microservices';
import { USER_CLIENT, userClient } from '@api/grpc/user';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_CLIENT,
        ...userClient,
      },
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}

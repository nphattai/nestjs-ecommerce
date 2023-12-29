import {
  RegisterReq,
  RegisterRes,
  USER_CLIENT,
  USER_SERVICE_NAME,
  UserServiceClient,
} from '@api/grpc/user';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class UserService implements UserServiceClient, OnModuleInit {
  private userClient: UserServiceClient;

  constructor(@Inject(USER_CLIENT) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userClient =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  register(request: RegisterReq): Observable<RegisterRes> {
    return this.userClient.register(request);
  }
}

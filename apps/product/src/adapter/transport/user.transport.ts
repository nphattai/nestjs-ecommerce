import {
  HelloUserReq,
  HelloUserRes,
  USER_CLIENT,
  USER_SERVICE_NAME,
  UserServiceClient,
} from '@api/grpc/user';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { IUserTransport } from '../../port';

@Injectable()
export class GrpcUserTransport implements IUserTransport {
  private readonly grpcClient: UserServiceClient;

  constructor(@Inject(USER_CLIENT) private client: ClientGrpc) {
    this.grpcClient =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async helloUser(req: HelloUserReq): Promise<HelloUserRes> {
    return await lastValueFrom(this.grpcClient.helloUser(req));
  }
}

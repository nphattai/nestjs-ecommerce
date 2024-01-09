import { HelloUserReq, HelloUserRes, USER_CLIENT, USER_SERVICE_NAME, UserServiceClient } from '@api/grpc/user';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { processGRPCResult } from '@util/grpc';

@Injectable()
export class GrpcUserTransport {
  private readonly grpcClient: UserServiceClient;

  constructor(@Inject(USER_CLIENT) private client: ClientGrpc) {
    this.grpcClient = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async helloUser(req: HelloUserReq): Promise<HelloUserRes> {
    return await processGRPCResult(this.grpcClient.helloUser(req));
  }
}

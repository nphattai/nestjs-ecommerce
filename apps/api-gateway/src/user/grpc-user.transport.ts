import {
  GetUserInfoReq,
  LoginUserReq,
  RegisterUserReq,
  USER_CLIENT,
  USER_SERVICE_NAME,
  UpdateUserInfoReq,
  UserServiceClient,
} from '@api/grpc/user';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { processGRPCResult } from '@util/grpc';

@Injectable()
export class GrpcUserTransport {
  private readonly grpcClient: UserServiceClient;

  constructor(@Inject(USER_CLIENT) private client: ClientGrpc) {
    this.grpcClient = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  register(request: RegisterUserReq) {
    return processGRPCResult(this.grpcClient.register(request));
  }

  login(request: LoginUserReq) {
    return processGRPCResult(this.grpcClient.login(request));
  }

  getUserInfo(request: GetUserInfoReq) {
    return processGRPCResult(this.grpcClient.getUserInfo(request));
  }

  updateUserInfo(request: UpdateUserInfoReq) {
    return processGRPCResult(this.grpcClient.updateUserInfo(request));
  }
}

import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USER_PACKAGE_NAME } from './proto/user';

const protoPaths = [join(__dirname, 'proto/user/user.proto')];

export const userClient: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:50051', // TODO: move to env variable 'USER_GRPC_URL
    package: USER_PACKAGE_NAME,
    protoPath: protoPaths,
  },
};

export const USER_CLIENT = Symbol('USER_CLIENT');

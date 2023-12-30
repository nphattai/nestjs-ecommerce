import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PRODUCT_PACKAGE_NAME } from './proto/product';

const protoPaths = [join(__dirname, 'proto/product/product.proto')];

export const productClient: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:50052', // TODO: move to env variable 'PRODUCT_GRPC_URL
    package: PRODUCT_PACKAGE_NAME,
    protoPath: protoPaths,
  },
};

export const PRODUCT_CLIENT = Symbol('PRODUCT_CLIENT');

import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus } from '@nestjs/common';

export type ErrorInfo = { message?: string; details?: unknown };

export type ErrorMetadata = {
  message: string;
  httpStatus?: HttpStatus;
  grpcStatus?: Status;
  internal?: boolean;
};

export type ErrorMetadataMap<Error extends string> = {
  [key in Error]: ErrorMetadata;
};

export interface IHttpErrorResponse {
  code: string;
  message: string;
  requestId: string;
  path: string;
  method: string;
  timestamp: string;
}

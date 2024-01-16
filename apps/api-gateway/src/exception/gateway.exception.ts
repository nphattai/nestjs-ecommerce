import { ErrorInfo, ErrorMetadata, ErrorMetadataMap, Exception } from '@common/error';
import { HttpStatus } from '@nestjs/common';

export enum GatewayError {
  UNAUTHORIZED = 'UNAUTHORIZED',
}

export const GatewayErrorMetadata: ErrorMetadataMap<GatewayError> = {
  [GatewayError.UNAUTHORIZED]: {
    message: 'Unauthorized',
    httpStatus: HttpStatus.UNAUTHORIZED,
  },
};

export class GatewayException extends Exception<GatewayError> {
  constructor(code: GatewayError, info: ErrorInfo, metadata?: ErrorMetadata) {
    super(code, info, metadata);
  }
}

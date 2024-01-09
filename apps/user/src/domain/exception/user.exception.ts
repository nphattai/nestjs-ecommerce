import { ErrorInfo, ErrorMetadata, ErrorMetadataMap, Exception } from '@common/error';
import { HttpStatus } from '@nestjs/common';

export enum UserError {
  REGISTER_FAILED = 'REGISTER_FAILED',
}

export const UserErrorMetadata: ErrorMetadataMap<UserError> = {
  [UserError.REGISTER_FAILED]: {
    message: 'Register failed',
    httpStatus: HttpStatus.BAD_REQUEST,
    internal: false,
  },
};

export class UserException extends Exception<UserError> {
  constructor(code: UserError, info: ErrorInfo, metadata?: ErrorMetadata) {
    super(code, info, metadata);
  }
}

import { ErrorInfo, ErrorMetadata, ErrorMetadataMap, Exception } from '@common/error';
import { HttpStatus } from '@nestjs/common';

export enum UserError {
  COMMON_ERROR = 'COMMON_ERROR',
}

export const UserErrorMetadata: ErrorMetadataMap<UserError> = {
  [UserError.COMMON_ERROR]: {
    message: 'Common error',
    httpStatus: HttpStatus.BAD_REQUEST,
  },
};

export class UserException extends Exception<UserError> {
  constructor(code: UserError, info: ErrorInfo, metadata?: ErrorMetadata) {
    super(code, info, metadata);
  }
}

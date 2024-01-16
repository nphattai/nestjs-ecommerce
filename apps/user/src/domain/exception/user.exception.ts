import { ErrorInfo, ErrorMetadata, ErrorMetadataMap, Exception } from '@common/error';
import { HttpStatus } from '@nestjs/common';

export enum UserError {
  REGISTER_FAILED = 'REGISTER_FAILED',
  LOGIN_FAILED = 'LOGIN_FAILED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
}

export const UserErrorMetadata: ErrorMetadataMap<UserError> = {
  [UserError.REGISTER_FAILED]: {
    message: 'Register failed',
    httpStatus: HttpStatus.BAD_REQUEST,
  },
  [UserError.LOGIN_FAILED]: {
    message: 'Login failed',
    httpStatus: HttpStatus.FORBIDDEN,
  },
  [UserError.UNAUTHORIZED]: {
    message: 'Unauthorized',
    httpStatus: HttpStatus.UNAUTHORIZED,
  },
  [UserError.USER_NOT_FOUND]: {
    message: 'User not found',
    httpStatus: HttpStatus.NOT_FOUND,
  },
};

export class UserException extends Exception<UserError> {
  constructor(code: UserError, info: ErrorInfo, metadata?: ErrorMetadata) {
    super(code, info, metadata);
  }
}

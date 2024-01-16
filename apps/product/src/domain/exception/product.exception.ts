import { ErrorInfo, ErrorMetadata, ErrorMetadataMap, Exception } from '@common/error';
import { HttpStatus } from '@nestjs/common';

export enum ProductError {
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
}

export const ProductErrorMetadata: ErrorMetadataMap<ProductError> = {
  [ProductError.PRODUCT_NOT_FOUND]: {
    message: 'Product not found',
    httpStatus: HttpStatus.NOT_FOUND,
  },
};

export class ProductException extends Exception<ProductError> {
  constructor(code: ProductError, info: ErrorInfo, metadata?: ErrorMetadata) {
    super(code, info, metadata);
  }
}

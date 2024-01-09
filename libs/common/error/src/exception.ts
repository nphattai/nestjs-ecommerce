import { ErrorInfo, ErrorMetadata } from './type';

export class Exception<ErrorType extends string> extends Error {
  code: ErrorType;
  details?: any;
  customMessage?: string;
  metadata?: ErrorMetadata;

  constructor(code: ErrorType, info?: ErrorInfo, metadata?: ErrorMetadata) {
    super(code);
    this.code = code;
    this.details = info?.details;
    this.customMessage = info?.message;
    this.metadata = metadata;
  }

  override toString() {
    return `${this.code} - ${this.customMessage} - ${JSON.stringify(this.details)}`;
  }
}

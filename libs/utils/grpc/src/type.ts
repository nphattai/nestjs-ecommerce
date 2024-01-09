import { ErrorMetadata } from '@common/error';

export type GRPCErrorPayload = {
  code: string;
  message: string;
  details?: object;
  metadata?: ErrorMetadata;
};

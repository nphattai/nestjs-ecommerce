import { Exception } from '@common/error';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, catchError } from 'rxjs';
import { GRPCErrorPayload } from './type';

@Injectable()
export class GrpcErrorInterceptor implements NestInterceptor {
  private logger = new Logger(GrpcErrorInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((error) => {
        this.logger.error(error);

        if (error instanceof Exception && error.metadata) {
          if (!error.metadata.internal) {
            this.logger.error({ ...error.metadata, error });

            const errorPayload: GRPCErrorPayload = {
              message: error.customMessage || error.metadata.message,
              code: error.code,
              details: error.details,
              metadata: error.metadata,
            };

            throw new RpcException({
              code: error.metadata.grpcStatus || Status.INTERNAL,
              message: JSON.stringify(errorPayload),
            });
          }
        }

        throw new RpcException({ code: Status.INTERNAL, message: 'Internal error' });
      })
    );
  }
}

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { Exception } from './exception';
import { IHttpErrorResponse } from './type';
import { CommonError } from './common.error';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(`${CustomExceptionFilter.name}`);

  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    handleCommonException(exception, request, response, this.logger);
  }
}

function handleCommonException(exception: any, request: Request, response: Response, logger: Logger) {
  let errorMetadata: ErrorMetadata;
  let httpStatus: number | undefined;

  const exceptionData = handleException(exception);
  httpStatus = exceptionData.httpStatus;
  errorMetadata = exceptionData.errorData!;

  const httpExceptionData = handleHTTPException(exception);
  httpStatus ||= httpExceptionData.httpStatus;
  errorMetadata ||= httpExceptionData.errorData;

  errorMetadata ||= { message: 'Internal error', code: CommonError.INTERNAL_ERROR };

  const payload = craftErrorResponse(request, errorMetadata);

  response.status(httpStatus || HttpStatus.INTERNAL_SERVER_ERROR).json(payload);
}

function handleException(exception: any) {
  let httpStatus;
  let errorData;
  if (exception instanceof Exception && exception.metadata) {
    if (!exception.metadata.internal) {
      httpStatus = exception.metadata.httpStatus || HttpStatus.INTERNAL_SERVER_ERROR;
      errorData = {
        message: exception.customMessage || exception.metadata.message,
        code: exception.code,
        details: exception.details,
      };
    }
  }

  return { httpStatus, errorData };
}

function handleHTTPException(exception: any) {
  let httpStatus;
  let errorData;
  if (exception instanceof HttpException) {
    errorData =
      typeof exception.getResponse() === 'string'
        ? { message: exception.getResponse() }
        : (exception.getResponse() as any);
    httpStatus = exception.getStatus();
    const indexOfHttpStatus = Object.values(HttpStatus).indexOf(httpStatus);
    errorData.code = Object.keys(HttpStatus)[indexOfHttpStatus];
  }

  return { httpStatus, errorData };
}

declare module 'express' {
  interface Request {
    requestId: string;
  }
}

type ErrorMetadata = { message: string; code: string; details?: string };

function craftErrorResponse(request: Request, errorData: ErrorMetadata): IHttpErrorResponse {
  return {
    ...errorData,
    requestId: request.requestId,
    path: request.originalUrl,
    method: request.method,
    timestamp: new Date().toUTCString(),
  };
}

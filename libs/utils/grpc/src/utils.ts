import { Exception } from '@common/error';
import { isValidJSONString } from '@common/json';
import { lastValueFrom, Observable } from 'rxjs';
import { GRPCErrorPayload } from './type';

export async function processGRPCResult<T>(res: Observable<T>): Promise<T> {
  try {
    return await lastValueFrom(res);
  } catch (err: any) {
    if (err.details && err.code && isValidJSONString(err.details)) {
      const { message, code, details, metadata }: GRPCErrorPayload = JSON.parse(err.details);
      throw new Exception(code, { message, details }, metadata);
    }

    throw err;
  }
}

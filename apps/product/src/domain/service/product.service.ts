import { Inject, Injectable } from '@nestjs/common';
import {
  HelloCmd,
  HelloRes,
  IProductService,
  IUserTransport,
  USER_TRANSPORT,
} from '../../port';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject(USER_TRANSPORT) private readonly userTransport: IUserTransport
  ) {}

  async helloUser(req: HelloCmd): Promise<HelloRes> {
    const res = await this.userTransport.helloUser({ name: req.name });

    const result: HelloRes = { message: res.message };

    return result;
  }

  hello(req: HelloCmd): HelloRes {
    return { message: `Hello product ${req.name}` };
  }
}

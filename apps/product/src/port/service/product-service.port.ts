export const PRODUCT_SERVICE = Symbol('PRODUCT_SERVICE');

export interface IProductService {
  hello(req: HelloCmd): HelloRes;
  helloUser(req: HelloCmd): Promise<HelloRes>;
}

export type HelloCmd = { name: string };

export type HelloRes = { message: string };

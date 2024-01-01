import { Product } from '../../domain/model/product.model';

export const PRODUCT_SERVICE = Symbol('PRODUCT_SERVICE');

export interface IProductService {
  hello(req: HelloCmd): HelloRes;
  helloUser(req: HelloCmd): Promise<HelloRes>;
  createProduct(req: CreateProductCmd): Promise<Product>;
}

export type HelloCmd = { name: string };

export type HelloRes = { message: string };

export type CreateProductCmd = Pick<Product, 'name' | 'description' | 'price'>;

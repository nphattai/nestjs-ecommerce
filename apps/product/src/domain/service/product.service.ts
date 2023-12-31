import { Inject, Injectable } from '@nestjs/common';
import { CreateProductCmd, HelloCmd, HelloRes, IProductService, IUserTransport, USER_TRANSPORT } from '../../port';
import { IProductRepository, PRODUCT_REPOSITORY } from '../../port/repository/product-repository.port';
import { Product } from '../model/product.model';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject(USER_TRANSPORT) private readonly userTransport: IUserTransport,
    @Inject(PRODUCT_REPOSITORY) private readonly productRepository: IProductRepository
  ) {}

  createProduct(req: CreateProductCmd): Promise<Product> {
    return this.productRepository.insertOne(
      Product.from({ name: req.name, description: req.description, price: req.price })
    );
  }

  async helloUser(req: HelloCmd): Promise<HelloRes> {
    const res = await this.userTransport.helloUser({ name: req.name });

    const result: HelloRes = { message: res.message };

    return result;
  }

  hello(req: HelloCmd): HelloRes {
    return { message: `Hello product ${req.name}` };
  }
}

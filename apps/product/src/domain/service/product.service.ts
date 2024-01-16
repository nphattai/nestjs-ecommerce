import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  CreateProductCmd,
  DeleteProductCmd,
  DeleteProductResult,
  FindProductCmd,
  FindProductResult,
  GetProductDetailCmd,
  IProductService,
  ProductDetailResult,
  UpdateProductCmd,
  UpdateProductInventoryCmd,
  UpdateProductInventoryResult,
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../port';
import { Product } from '../model';

@Injectable()
export class ProductService implements IProductService {
  private logger: Logger;

  constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: IProductRepository) {
    this.logger = new Logger(ProductService.name);
  }

  createProduct(product: CreateProductCmd): Promise<ProductDetailResult> {
    throw new Error('Method not implemented.');
  }
  getProductDetail(cmd: GetProductDetailCmd): Promise<ProductDetailResult> {
    throw new Error('Method not implemented.');
  }

  async findProduct(cmd: FindProductCmd): Promise<FindProductResult> {
    this.logger.log(this.findProduct.name, JSON.stringify(cmd));

    const { skip, limit, sort, ...query } = cmd;

    let filter = {};

    if (query.fromPrice !== undefined && query.fromPrice !== null) {
      filter.price = Greatert;
    }

    if (query.toPrice !== undefined && query.toPrice !== null) {
      filter.price = {
        $lte: query.fromPrice,
      };
    }

    filter = {
      ...query,
    };

    const res = await this.productRepository.find({ skip, limit, filter });
    const total = await this.productRepository.count(filter);

    return { data: res, total };
  }

  deleteProduct(cmd: DeleteProductCmd): Promise<DeleteProductResult> {
    throw new Error('Method not implemented.');
  }
  updateProduct(cmd: UpdateProductCmd): Promise<ProductDetailResult> {
    throw new Error('Method not implemented.');
  }
  updateProductInventory(cmd: UpdateProductInventoryCmd): Promise<UpdateProductInventoryResult> {
    throw new Error('Method not implemented.');
  }
}

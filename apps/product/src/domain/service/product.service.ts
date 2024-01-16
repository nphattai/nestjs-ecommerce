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

    const { skip, limit, sort, ...filter } = cmd;

    return this.productRepository.findByQuery({ skip, limit, filter });
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

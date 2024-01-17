import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  CreateProductCmd,
  DeleteProductCmd,
  DeleteProductResult,
  FindProductCmd,
  FindProductResult,
  GetProductDetailCmd,
  IProductRepository,
  IProductService,
  PRODUCT_REPOSITORY,
  ProductDetailResult,
  UpdateProductCmd,
  UpdateProductInventoryCmd,
  UpdateProductInventoryResult,
} from '../../port';
import { ProductError, ProductErrorMetadata, ProductException } from '../exception';
import { Product } from '../model';

@Injectable()
export class ProductService implements IProductService {
  private logger: Logger;

  constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: IProductRepository) {
    this.logger = new Logger(ProductService.name);
  }

  async createProduct(cmd: CreateProductCmd): Promise<ProductDetailResult> {
    this.logger.log(this.createProduct.name, JSON.stringify(cmd));
    const product = Product.from({ ...cmd });
    const result = await this.productRepository.save(product);
    return result;
  }

  async getProductDetail(cmd: GetProductDetailCmd): Promise<ProductDetailResult> {
    this.logger.log(this.getProductDetail.name, `id: ${cmd.id}`);
    const { id } = cmd;
    const product = await this.productRepository.findOne({ filter: { id } });

    if (!product) {
      throw new ProductException(
        ProductError.PRODUCT_NOT_FOUND,
        { message: `Product not found ${id}` },
        ProductErrorMetadata.PRODUCT_NOT_FOUND
      );
    }

    return product;
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

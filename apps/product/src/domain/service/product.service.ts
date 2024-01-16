import { Inject, Injectable } from '@nestjs/common';
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
  constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: IProductRepository) {}
  createProduct(product: CreateProductCmd): Promise<ProductDetailResult> {
    throw new Error('Method not implemented.');
  }
  getProductDetail(cmd: GetProductDetailCmd): Promise<ProductDetailResult> {
    throw new Error('Method not implemented.');
  }
  findProduct(cmd: FindProductCmd): Promise<FindProductResult> {
    throw new Error('Method not implemented.');
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

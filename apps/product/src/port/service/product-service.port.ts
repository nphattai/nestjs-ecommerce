import { ProductDetailRes } from '@api/grpc/product';
import { BaseCmd, BaseDTO } from '@domain/data';
import { Expose } from 'class-transformer';
import { fromDateToUnix } from 'libs/common/datetime/src';
import { Product } from '../../domain/model';

export const PRODUCT_SERVICE = Symbol('PRODUCT_SERVICE');

export interface IProductService {
  createProduct(product: CreateProductCmd): Promise<ProductDetailResult>;
  getProductDetail(cmd: GetProductDetailCmd): Promise<ProductDetailResult>;
  findProduct(cmd: FindProductCmd): Promise<FindProductResult>;
  deleteProduct(cmd: DeleteProductCmd): Promise<DeleteProductResult>;
  updateProduct(cmd: UpdateProductCmd): Promise<ProductDetailResult>;
  updateProductInventory(cmd: UpdateProductInventoryCmd): Promise<UpdateProductInventoryResult>;
}

export class UpdateProductInventoryCmd extends BaseCmd {
  @Expose() id: number;
  @Expose() quantity: number;
}

export class UpdateProductInventoryResult extends BaseDTO {
  @Expose() id: number;
}

export class UpdateProductCmd extends BaseCmd {
  @Expose() id: number;
  @Expose() name?: string;
  @Expose() description?: string;
  @Expose() sku?: string;
  @Expose() price?: number;
  @Expose() categoryId?: number;
  @Expose() discountId?: number;
}

export class DeleteProductCmd extends BaseCmd {
  @Expose() id: number;
}

export class DeleteProductResult extends BaseDTO {
  @Expose() success: boolean;
  @Expose() message: string;
}

export class FindProductCmd extends BaseCmd {
  @Expose() name?: string;
  @Expose() categoryId?: number;
  @Expose() fromPrice?: number;
  @Expose() toPrice?: number;
  @Expose() isDiscount?: boolean;
  @Expose() limit?: number;
  @Expose() skip?: number;
  @Expose() sort?: string;
}

export class FindProductResult extends BaseDTO {
  @Expose() total: number;
  @Expose() data: ProductDetailResult[];
}

export class GetProductDetailCmd extends BaseCmd {
  @Expose() id: number;
}

export class ProductDetailResult extends BaseDTO implements Product {
  @Expose() name: string;
  @Expose() description: string;
  @Expose() sku: string;
  @Expose() price: number;
  @Expose() categoryId: number;
  @Expose() inventoryId: number;
  @Expose() discountId: number;
  @Expose() deletedAt: Date;
  @Expose() id: number;
  @Expose() pid: string;
  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;

  static toGrpc(userDetail: ProductDetailResult): ProductDetailRes {
    return {
      ...userDetail,
      deletedAt: userDetail.deletedAt ? fromDateToUnix(userDetail.deletedAt) : null,
      createdAt: fromDateToUnix(userDetail.createdAt),
      updatedAt: fromDateToUnix(userDetail.updatedAt),
    };
  }
}

export class CreateProductCmd extends BaseCmd {
  @Expose() name: string;
  @Expose() description?: string;
  @Expose() sku?: string;
  @Expose() price: number;
  @Expose() categoryId: number;
  @Expose() inventoryId: number;
  @Expose() discountId?: number;
}

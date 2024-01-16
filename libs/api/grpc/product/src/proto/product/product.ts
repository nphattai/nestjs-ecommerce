/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export interface ListDiscountRes {
  total: number;
  data: DiscountDetailRes[];
}

export interface DisableDiscountReq {
  id: number;
}

export interface DisableDiscountRes {
  success: boolean;
  message: string;
}

export interface ActiveDiscountReq {
  id: number;
}

export interface ActiveDiscountRes {
  success: boolean;
  message: string;
}

export interface DeleteDiscountReq {
  id: number;
}

export interface DeleteDiscountRes {
  success: boolean;
  message: string;
}

export interface CreateDiscountReq {
  name: string;
  description: string;
  discountPercent: number;
  active: boolean;
}

export interface GetDiscountReq {
  id: number;
}

export interface FindDiscountReq {
  skip: number;
  limit: number;
  sort: string;
  active: boolean;
  fromDiscountPercent: number;
  toDiscountPercent: number;
}

export interface DiscountDetailRes {
  name: string;
  description: string;
  discountPercent: number;
  active: boolean;
  deletedAt: number;
  id: number;
  pid: string;
  createdAt: number;
  updatedAt: number;
}

export interface UpdateProductInventoryReq {
  id: number;
  quantity: number;
}

export interface UpdateProductInventoryRes {
  success: boolean;
  message: string;
}

export interface UpdateProductReq {
  id: number;
  name?: string | undefined;
  description?: string | undefined;
  sku?: string | undefined;
  price?: number | undefined;
  categoryId?: number | undefined;
  discountId?: number | undefined;
}

export interface DeleteProductReq {
  id: number;
}

export interface DeleteProductRes {
  success: boolean;
  message: string;
}

export interface FindProductReq {
  skip: number;
  limit: number;
  sort: string;
  name: string;
  categoryId: number;
  isDiscount: boolean;
  fromPrice: number;
  toPrice: number;
}

export interface ListProductRes {
  total: number;
  data: ProductDetailRes[];
}

export interface GetProductReq {
  id: number;
}

export interface CreateProductReq {
  name: string;
  description?: string | undefined;
  sku?: string | undefined;
  price: number;
  categoryId: number;
  inventoryId: number;
  discountId?: number | undefined;
}

export interface ProductDetailRes {
  name: string;
  description: string;
  sku: string;
  price: number;
  categoryId: number;
  inventoryId: number;
  discountId: number;
  deletedAt: number;
  id: number;
  pid: string;
  createdAt: number;
  updatedAt: number;
}

export const PRODUCT_PACKAGE_NAME = 'product';

export interface ProductServiceClient {
  createProduct(request: CreateProductReq): Observable<ProductDetailRes>;

  getProductDetail(request: GetProductReq): Observable<ProductDetailRes>;

  findProduct(request: FindProductReq): Observable<ListProductRes>;

  deleteProduct(request: DeleteProductReq): Observable<DeleteProductRes>;

  updateProduct(request: UpdateProductReq): Observable<ProductDetailRes>;

  updateProductInventory(request: UpdateProductInventoryReq): Observable<UpdateProductInventoryRes>;

  createDiscount(request: CreateDiscountReq): Observable<DiscountDetailRes>;

  getDiscountDetail(request: GetDiscountReq): Observable<DiscountDetailRes>;

  getListDiscount(request: FindDiscountReq): Observable<ListDiscountRes>;

  deleteDiscount(request: DeleteDiscountReq): Observable<DeleteDiscountRes>;

  activeDiscount(request: ActiveDiscountReq): Observable<ActiveDiscountRes>;

  disableDiscount(request: DisableDiscountReq): Observable<DisableDiscountRes>;
}

export interface ProductServiceController {
  createProduct(request: CreateProductReq): Promise<ProductDetailRes> | Observable<ProductDetailRes> | ProductDetailRes;

  getProductDetail(request: GetProductReq): Promise<ProductDetailRes> | Observable<ProductDetailRes> | ProductDetailRes;

  findProduct(request: FindProductReq): Promise<ListProductRes> | Observable<ListProductRes> | ListProductRes;

  deleteProduct(request: DeleteProductReq): Promise<DeleteProductRes> | Observable<DeleteProductRes> | DeleteProductRes;

  updateProduct(request: UpdateProductReq): Promise<ProductDetailRes> | Observable<ProductDetailRes> | ProductDetailRes;

  updateProductInventory(
    request: UpdateProductInventoryReq
  ): Promise<UpdateProductInventoryRes> | Observable<UpdateProductInventoryRes> | UpdateProductInventoryRes;

  createDiscount(
    request: CreateDiscountReq
  ): Promise<DiscountDetailRes> | Observable<DiscountDetailRes> | DiscountDetailRes;

  getDiscountDetail(
    request: GetDiscountReq
  ): Promise<DiscountDetailRes> | Observable<DiscountDetailRes> | DiscountDetailRes;

  getListDiscount(request: FindDiscountReq): Promise<ListDiscountRes> | Observable<ListDiscountRes> | ListDiscountRes;

  deleteDiscount(
    request: DeleteDiscountReq
  ): Promise<DeleteDiscountRes> | Observable<DeleteDiscountRes> | DeleteDiscountRes;

  activeDiscount(
    request: ActiveDiscountReq
  ): Promise<ActiveDiscountRes> | Observable<ActiveDiscountRes> | ActiveDiscountRes;

  disableDiscount(
    request: DisableDiscountReq
  ): Promise<DisableDiscountRes> | Observable<DisableDiscountRes> | DisableDiscountRes;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createProduct',
      'getProductDetail',
      'findProduct',
      'deleteProduct',
      'updateProduct',
      'updateProductInventory',
      'createDiscount',
      'getDiscountDetail',
      'getListDiscount',
      'deleteDiscount',
      'activeDiscount',
      'disableDiscount',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('ProductService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('ProductService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PRODUCT_SERVICE_NAME = 'ProductService';

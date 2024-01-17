import {
  ActiveDiscountReq,
  ActiveDiscountRes,
  CreateDiscountReq,
  CreateProductReq,
  DeleteDiscountReq,
  DeleteDiscountRes,
  DeleteProductReq,
  DeleteProductRes,
  DisableDiscountReq,
  DisableDiscountRes,
  DiscountDetailRes,
  FindDiscountReq,
  FindProductReq,
  GetDiscountReq,
  GetProductReq,
  ListDiscountRes,
  PRODUCT_CLIENT,
  PRODUCT_SERVICE_NAME,
  ProductDetailRes,
  ProductServiceClient,
  UpdateProductInventoryReq,
  UpdateProductInventoryRes,
  UpdateProductReq,
} from '@api/grpc/product';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { processGRPCResult } from '@util/grpc';
import { Observable } from 'rxjs';

@Injectable()
export class GrpcProductTransport {
  private readonly grpcClient: ProductServiceClient;

  constructor(@Inject(PRODUCT_CLIENT) private client: ClientGrpc) {
    this.grpcClient = this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  createProduct(request: CreateProductReq) {
    return processGRPCResult(this.grpcClient.createProduct(request));
  }

  getProductDetail(request: GetProductReq) {
    return processGRPCResult(this.grpcClient.getProductDetail(request));
  }

  findProduct(request: FindProductReq) {
    return processGRPCResult(this.grpcClient.findProduct(request));
  }

  deleteProduct(request: DeleteProductReq): Observable<DeleteProductRes> {
    throw new Error('Method not implemented.');
  }
  updateProduct(request: UpdateProductReq): Observable<ProductDetailRes> {
    throw new Error('Method not implemented.');
  }
  updateProductInventory(request: UpdateProductInventoryReq): Observable<UpdateProductInventoryRes> {
    throw new Error('Method not implemented.');
  }
  createDiscount(request: CreateDiscountReq): Observable<DiscountDetailRes> {
    throw new Error('Method not implemented.');
  }
  getDiscountDetail(request: GetDiscountReq): Observable<DiscountDetailRes> {
    throw new Error('Method not implemented.');
  }
  getListDiscount(request: FindDiscountReq): Observable<ListDiscountRes> {
    throw new Error('Method not implemented.');
  }
  deleteDiscount(request: DeleteDiscountReq): Observable<DeleteDiscountRes> {
    throw new Error('Method not implemented.');
  }
  activeDiscount(request: ActiveDiscountReq): Observable<ActiveDiscountRes> {
    throw new Error('Method not implemented.');
  }
  disableDiscount(request: DisableDiscountReq): Observable<DisableDiscountRes> {
    throw new Error('Method not implemented.');
  }
}

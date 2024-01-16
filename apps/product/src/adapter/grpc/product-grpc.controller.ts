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
  ListProductRes,
  ProductDetailRes,
  ProductServiceController,
  ProductServiceControllerMethods,
  UpdateProductInventoryReq,
  UpdateProductInventoryRes,
  UpdateProductReq,
} from '@api/grpc/product';
import { Controller, Inject } from '@nestjs/common';
import { FindProductCmd, IProductService, PRODUCT_SERVICE, ProductDetailResult } from '../../port';
import { Observable } from 'rxjs';

@Controller()
@ProductServiceControllerMethods()
export class ProductGrpcController implements ProductServiceController {
  constructor(@Inject(PRODUCT_SERVICE) private readonly productService: IProductService) {}

  createProduct(
    request: CreateProductReq
  ): ProductDetailRes | Promise<ProductDetailRes> | Observable<ProductDetailRes> {
    throw new Error('Method not implemented.');
  }

  getProductDetail(
    request: GetProductReq
  ): ProductDetailRes | Promise<ProductDetailRes> | Observable<ProductDetailRes> {
    throw new Error('Method not implemented.');
  }

  async findProduct(request: FindProductReq) {
    const cmd = FindProductCmd.init({ ...request });
    const response = await this.productService.findProduct(cmd);

    const result: ListProductRes = {
      total: response.total,
      data: response.data.map((item) => ProductDetailResult.toGrpc(item)),
    };

    return result;
  }

  deleteProduct(
    request: DeleteProductReq
  ): DeleteProductRes | Promise<DeleteProductRes> | Observable<DeleteProductRes> {
    throw new Error('Method not implemented.');
  }
  updateProduct(
    request: UpdateProductReq
  ): ProductDetailRes | Promise<ProductDetailRes> | Observable<ProductDetailRes> {
    throw new Error('Method not implemented.');
  }
  updateProductInventory(
    request: UpdateProductInventoryReq
  ): UpdateProductInventoryRes | Promise<UpdateProductInventoryRes> | Observable<UpdateProductInventoryRes> {
    throw new Error('Method not implemented.');
  }
  createDiscount(
    request: CreateDiscountReq
  ): DiscountDetailRes | Promise<DiscountDetailRes> | Observable<DiscountDetailRes> {
    throw new Error('Method not implemented.');
  }
  getDiscountDetail(
    request: GetDiscountReq
  ): DiscountDetailRes | Promise<DiscountDetailRes> | Observable<DiscountDetailRes> {
    throw new Error('Method not implemented.');
  }
  getListDiscount(request: FindDiscountReq): ListDiscountRes | Promise<ListDiscountRes> | Observable<ListDiscountRes> {
    throw new Error('Method not implemented.');
  }
  deleteDiscount(
    request: DeleteDiscountReq
  ): DeleteDiscountRes | Promise<DeleteDiscountRes> | Observable<DeleteDiscountRes> {
    throw new Error('Method not implemented.');
  }
  activeDiscount(
    request: ActiveDiscountReq
  ): ActiveDiscountRes | Promise<ActiveDiscountRes> | Observable<ActiveDiscountRes> {
    throw new Error('Method not implemented.');
  }
  disableDiscount(
    request: DisableDiscountReq
  ): DisableDiscountRes | Promise<DisableDiscountRes> | Observable<DisableDiscountRes> {
    throw new Error('Method not implemented.');
  }
}

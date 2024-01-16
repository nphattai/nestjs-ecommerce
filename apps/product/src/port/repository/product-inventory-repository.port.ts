import { IBaseRepository } from '@domain/storage';
import { ProductInventory } from '../../domain/model';

export const PRODUCT_INVENTORY_REPOSITORY = Symbol('PRODUCT_INVENTORY_REPOSITORY');

export interface IProductInventoryRepository extends IBaseRepository<ProductInventory> {}

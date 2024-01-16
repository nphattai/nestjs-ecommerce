import { PGBaseEntity } from '@domain/storage';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../../domain/model';
import { PRODUCT_SCHEMA } from '../constants';
import { DiscountEntity } from './discount.entity';
import { ProductCategoryEntity } from './product-category.entity';
import { ProductInventoryEntity } from './product-inventory.entity';

@Entity({ name: 'product', schema: PRODUCT_SCHEMA })
export class ProductEntity extends PGBaseEntity implements Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'sku', nullable: true })
  sku: string;

  @Column({ name: 'price' })
  price: number;

  @ManyToOne(() => ProductCategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: ProductCategoryEntity;

  @Column({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => ProductInventoryEntity)
  @JoinColumn({ name: 'inventory_id' })
  inventory: ProductInventoryEntity;

  @Column({ name: 'inventory_id' })
  inventoryId: number;

  @ManyToOne(() => DiscountEntity)
  @JoinColumn({ name: 'discount_id' })
  discount: DiscountEntity;

  @Column({ name: 'discount_id', nullable: true })
  discountId: number;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;
}

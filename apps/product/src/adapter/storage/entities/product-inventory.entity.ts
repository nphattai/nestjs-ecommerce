import { PGBaseEntity } from '@domain/storage';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductInventory } from '../../../domain/model';
import { PRODUCT_SCHEMA } from '../constants';

@Entity({ name: 'product-inventory', schema: PRODUCT_SCHEMA })
export class ProductInventoryEntity extends PGBaseEntity implements ProductInventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;
}

import { PGBaseEntity } from '@domain/storage';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCategory } from '../../../domain/model';
import { PRODUCT_SCHEMA } from '../constants';

@Entity({ name: 'product-category', schema: PRODUCT_SCHEMA })
export class ProductCategoryEntity extends PGBaseEntity implements ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;
}

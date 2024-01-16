import { PGBaseEntity } from '@domain/storage';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Discount } from '../../../domain/model';
import { PRODUCT_SCHEMA } from '../constants';

@Entity({ name: 'discount', schema: PRODUCT_SCHEMA })
export class DiscountEntity extends PGBaseEntity implements Discount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'discount_percent' })
  discountPercent: number;

  @Column()
  active: boolean;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;
}

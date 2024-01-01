import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../../domain/model/product.model';
import { PGBaseEntity } from '@domain/storage';

@Entity({ name: 'products' })
export class ProductEntity extends PGBaseEntity implements Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;
}

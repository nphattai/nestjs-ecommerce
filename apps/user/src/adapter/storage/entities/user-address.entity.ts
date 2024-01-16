import { ExcludeMethods } from '@domain/data';
import { PGBaseEntity } from '@domain/storage';
import { UserAddress } from 'apps/user/src/domain/model';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { USER_SCHEMA } from '../constant';

@Entity({ name: 'user_address', schema: USER_SCHEMA })
export class UserAddressEntity extends PGBaseEntity implements ExcludeMethods<UserAddress> {
  @Column({ name: 'id', type: 'int', primary: true, generated: 'increment' })
  id: number;

  @Column({ name: 'user_id', type: 'int', comment: 'User ID', nullable: false })
  userId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'address', type: 'varchar', comment: 'Address', nullable: false })
  address: string;

  @Column({ name: 'city', type: 'varchar', comment: 'City', nullable: false })
  city: string;

  @Column({ name: 'postal_code', type: 'varchar', comment: 'Postal Code', nullable: false })
  postalCode: string;

  @Column({ name: 'country', type: 'varchar', comment: 'Country', nullable: false })
  country: string;

  @Column({ name: 'phone', type: 'varchar', comment: 'Phone', nullable: false })
  phone: string;
}

import { ExcludeMethods } from '@domain/data';
import { PGBaseEntity } from '@domain/storage';
import { UserPayment } from 'apps/user/src/domain/model';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { USER_SCHEMA } from '../constant';

@Entity({ name: 'user_payment', schema: USER_SCHEMA })
export class UserPaymentEntity extends PGBaseEntity implements ExcludeMethods<UserPayment> {
  @Column({ name: 'id', type: 'int', primary: true, generated: 'increment' })
  id: number;

  @Column({ name: 'user_id', type: 'int', comment: 'User ID', nullable: false })
  userId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'provider', type: 'int', comment: 'Provider', nullable: false })
  provider: number;

  @Column({ name: 'account_no', type: 'varchar', comment: 'Account No', nullable: false })
  accountNo: string;
}

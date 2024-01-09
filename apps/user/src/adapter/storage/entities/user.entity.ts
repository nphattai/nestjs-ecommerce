import { ExcludeMethods } from '@domain/data';
import { PGBaseEntity } from '@domain/storage';
import { User } from 'apps/user/src/domain/model';
import { Column, Entity } from 'typeorm';
import { USER_SCHEMA } from '../constant';

@Entity({ name: 'user', schema: USER_SCHEMA })
export class UserEntity extends PGBaseEntity implements ExcludeMethods<User> {
  @Column({ name: 'id', type: 'int', primary: true, generated: 'increment' })
  id: number;

  @Column({ name: 'password', type: 'varchar', comment: 'Password', nullable: false })
  password: string;

  @Column({ name: 'first_name', type: 'varchar', comment: 'First Name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', comment: 'Last Name', nullable: true })
  lastName: string;

  @Column({ name: 'phone', type: 'varchar', comment: 'Phone', nullable: true })
  phone: string;

  @Column({ name: 'email', type: 'varchar', comment: 'Email', nullable: false, unique: true })
  email: string;
}

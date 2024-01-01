import { BaseEntity, Column, CreateDateColumn, Entity, Generated, UpdateDateColumn } from 'typeorm';

@Entity()
export abstract class PGBaseEntity extends BaseEntity {
  abstract id: number;

  @Column({
    name: 'pid',
    type: 'varchar',
    unique: true,
    comment: 'Id is provided to the client',
  })
  @Generated('uuid')
  pid: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}

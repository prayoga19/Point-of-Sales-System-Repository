import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity({ name: 'transaction' })
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  product_id: string;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  user_id: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  quantity: number;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  amount: number;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  updated_at: Date;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  deleted_at: Date;

  @ManyToOne(() => Product, (product) => product.transaction)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => User, (user) => user.transaction)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

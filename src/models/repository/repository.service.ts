import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Transaction } from '../entities/product-transaction.entity';

@Injectable()
export class RepositoryService {
  @InjectRepository(User)
  public readonly userRepo: Repository<User>;

  @InjectRepository(Product)
  public readonly productRepo: Repository<Product>;

  @InjectRepository(Transaction)
  public readonly transactionRepo: Repository<Transaction>;
}

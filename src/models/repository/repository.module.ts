import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../entities/product-transaction.entity';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { Global, Module } from '@nestjs/common';
import { RepositoryService } from './repository.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Product, Transaction])],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}

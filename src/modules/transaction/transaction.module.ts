import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [UserModule, ProductModule],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RepositoryService } from 'src/models/repository/repository.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Transaction } from 'src/models/entities/product-transaction.entity';

@Injectable()
export class TransactionService {
  public constructor(private readonly repoService: RepositoryService) {}

  async getAllTransaction(
    options: IPaginationOptions,
    startDate: Date,
    endDate: Date,
  ) {
    let DataTransaction = await this.repoService.transactionRepo
      .createQueryBuilder('transaction')
      .orderBy('transaction.created_at', 'DESC');

    if (startDate && endDate) {
      const start = startDate;
      const end = endDate;
      DataTransaction = DataTransaction.andWhere(
        'transaction.created_at > :start',
        {
          start,
        },
      ).andWhere('transaction.created_at < :end', { end });
    }

    return paginate<Transaction>(DataTransaction, options);
  }

  async createTransaction(payloads: CreateTransactionDto) {
    const dataProduct = await this.repoService.productRepo
      .createQueryBuilder('product')
      .where('product.id = :id', { id: payloads.product_id })
      .getOne();

    const dataUser = await this.repoService.userRepo
      .createQueryBuilder('user')
      .where('user.id = :id', { id: payloads.user_id })
      .getOne();

    const total = payloads.quantity * dataProduct.price;

    const DataTransaction = await this.repoService.transactionRepo.create({
      product_id: payloads.product_id,
      user_id: payloads.user_id,
      quantity: payloads.quantity,
      amount: total,
    });
    await this.repoService.transactionRepo.save(DataTransaction);

    const updateQuantityProduct =
      dataProduct.quantity - DataTransaction.quantity;

    await this.repoService.productRepo.update(
      {
        id: DataTransaction.product_id,
      },
      { quantity: updateQuantityProduct },
    );

    if (dataProduct && dataUser) {
      return DataTransaction;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error_code: 'PRODUCT_ID_OR_USER_ID_NOT_FOUND',
          message: 'data not found on system',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}

import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@ApiTags('transaction')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiQuery({
    name: 'startDate',
    required: false,
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
  })
  @Get()
  async findAll(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    const result = await this.transactionService.getAllTransaction(
      {
        page,
        limit,
      },
      startDate,
      endDate,
    );
    return result;
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTransaction(
    @Body() transaction: CreateTransactionDto,
    @Request() req,
  ) {
    const UserLoggedIn = req.user;

    transaction.user_id = UserLoggedIn.id;
    return this.transactionService.createTransaction(transaction);
  }
}

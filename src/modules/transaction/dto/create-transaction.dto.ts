import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty({ message: 'product_id should be UUID' })
  product_id: string;

  @ApiHideProperty()
  user_id: string;

  @ApiHideProperty()
  amount: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'quantity should not be empty' })
  quantity: number;
}

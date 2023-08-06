import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'name should not be empty' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'price should not be empty' })
  price: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'quantity should not be empty' })
  quantity: number;
}

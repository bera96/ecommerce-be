import { CartItem } from '../../carts/schemas/carts.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: 'User ID' })
  userId: string;

  @ApiProperty({ description: 'Cart items' })
  items: CartItem[];

  @ApiProperty({ description: 'Total amount' })
  totalAmount: number;
}

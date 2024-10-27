import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class AddProductToCartDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  quantity: number;
}

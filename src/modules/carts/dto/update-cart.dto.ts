import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCartDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  quantity: number;
}

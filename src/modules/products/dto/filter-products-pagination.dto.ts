import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FilterProductsPaginationDto {
  @ApiProperty({ description: 'Search', required: false })
  @IsOptional()
  @IsString()
  readonly search?: string;

  @ApiProperty({ description: 'Category', required: false })
  @IsOptional()
  @IsString()
  readonly category?: string;

  @ApiProperty({ description: 'Min price', minimum: 0, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  readonly minPrice?: number;

  @ApiProperty({ description: 'Max price', minimum: 0, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  readonly maxPrice?: number;

  @ApiProperty({ description: 'Sort by', required: false })
  @IsOptional()
  @IsString()
  readonly sortBy?: string;

  @ApiProperty({ description: 'Sort order', enum: ['asc', 'desc'], required: false })
  @IsOptional()
  @IsString()
  readonly sortOrder?: 'asc' | 'desc';

  @ApiProperty({ description: 'Page', minimum: 1, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  readonly page?: number = 1;

  @ApiProperty({ description: 'Limit', minimum: 1, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  readonly limit?: number = 10;
}

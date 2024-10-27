import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FilterProductsPaginationDto } from './dto/filter-products-pagination.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Products } from './schemas/products.schema';

@ApiTags('products')
@ApiBearerAuth('JWT-AUTH')
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'Get all products',
    type: [Products],
  })
  async getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get('filter')
  @ApiOperation({ summary: 'Get filtered products' })
  @ApiResponse({
    status: 200,
    description: 'Get filtered products',
    type: [Products],
  })
  async getFilteredProducts(
    @Query() filterPaginationDto: FilterProductsPaginationDto,
  ) {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder,
      page,
      limit,
    } = filterPaginationDto;
    const filters = {
      ...(search && { name: { $regex: search, $options: 'i' } }),
      ...(category && { category }),
      ...(minPrice && { price: { $gte: minPrice } }),
      ...(maxPrice && { price: { $lte: maxPrice } }),
    };
    const paginationQuery = { page, limit };

    return this.productsService.getFilteredProducts(
      filters,
      sortBy,
      sortOrder,
      paginationQuery,
    );
  }
}

import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FilterProductsPaginationDto } from './dto/filter-products-pagination.dto';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get('filter')
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

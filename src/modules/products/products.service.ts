import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products, ProductsDocument } from './schemas/products.schema';
import { faker } from '@faker-js/faker';
import { CategoriesService } from '../categories/categories.service';
import { PaginationService } from '../pagination/pagination.service';
import { PaginationQueryDto } from '../pagination/dto/pagination-query.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  constructor(
    @InjectModel(Products.name) private productsModel: Model<Products>,
    private categoriesService: CategoriesService,
    private paginationService: PaginationService,
  ) {}

  async seedProducts() {
    const productsCount = await this.productsModel.countDocuments();
    if (productsCount === 0) {
      const categories = await this.categoriesService.categoriesModel
        .find()
        .exec();

      const fakeProducts = await Promise.all(
        Array.from({ length: 100 }).map(async () => {
          const randomCategory =
            categories[Math.floor(Math.random() * categories.length)];
          return {
            name: faker.commerce.productName(),
            price: Number(faker.commerce.price()),
            stock: Math.floor(Math.random() * 100),
            description: faker.commerce.productDescription(),
            category: randomCategory._id,
          };
        }),
      );

      await this.productsModel.insertMany(fakeProducts);
      this.logger.verbose('Fake products seeded');
    } else {
      this.logger.verbose('Products already exist, skipping seeding');
    }
  }

  async updateStock(productId: string, newStock: number): Promise<Products> {
    const updatedProduct = await this.productsModel
      .findByIdAndUpdate(productId, { stock: newStock }, { new: true })
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }

    return updatedProduct;
  }

  async getAllProducts(): Promise<Products[]> {
    return this.productsModel.find().exec();
  }

  async getFilteredProducts(
    filters: any,
    sortBy: string,
    sortOrder: 'asc' | 'desc',
    paginationQuery: PaginationQueryDto,
  ) {
    const sort = sortBy ? { [sortBy]: sortOrder } : {};
    return this.paginationService.paginate<ProductsDocument>(
      this.productsModel as Model<ProductsDocument>,
      paginationQuery,
      filters,
      sort,
    );
  }

  async findById(id: string): Promise<Products | null> {
    return this.productsModel.findById(id).exec();
  }
}

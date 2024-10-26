import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products } from './schemas/products.schema';
import { faker } from '@faker-js/faker';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  constructor(
    @InjectModel(Products.name) private productsModel: Model<Products>,
    private categoriesService: CategoriesService,
  ) {}

  async seedProducts() {
    const productsCount = await this.productsModel.countDocuments();
    if (productsCount === 0) {
      const categories = await this.categoriesService.categoriesModel
        .find()
        .sort({ priority: 1 })
        .exec();

      const fakeProducts = await Promise.all(
        Array.from({ length: 10 }).map(async (_, index) => {
          const category = categories[index % categories.length];
          return {
            name: faker.commerce.productName(),
            price: Number(faker.commerce.price()),
            description: faker.commerce.productDescription(),
            category: category._id,
          };
        }),
      );

      await this.productsModel.insertMany(fakeProducts);
      this.logger.verbose('Fake products seeded');
    } else {
      this.logger.verbose('Products already exist, skipping seeding');
    }
  }
}

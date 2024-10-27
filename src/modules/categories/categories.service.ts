import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categories } from './schemas/categories.schema';
import { faker } from '@faker-js/faker';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);
  constructor(
    @InjectModel(Categories.name) public categoriesModel: Model<Categories>,
  ) {}

  async seedCategories() {
    const categoriesCount = await this.categoriesModel.countDocuments();
    if (categoriesCount === 0) {
      const uniqueCategories = new Set();
      const fakeCategories = [];

      while (uniqueCategories.size < 10) {
        const categoryName = faker.commerce.department();
        if (!uniqueCategories.has(categoryName)) {
          uniqueCategories.add(categoryName);
          fakeCategories.push({
            name: categoryName,
            priority: uniqueCategories.size,
          });
        }
      }

      await this.categoriesModel.insertMany(fakeCategories);
      this.logger.verbose('Fake categories seeded');
    } else {
      this.logger.verbose('Categories already exist, skipping seeding');
    }
  }
}

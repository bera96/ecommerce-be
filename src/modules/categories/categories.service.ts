import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categories } from './schemas/categories.schema';
import { faker } from '@faker-js/faker';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Categories.name) public categoriesModel: Model<Categories>) {}

  async seedCategories() {
    const categoriesCount = await this.categoriesModel.countDocuments();
    if (categoriesCount === 0) {
      const fakeCategories = Array.from({ length: 10 }).map((_, index) => ({
        name: faker.commerce.department(),
        priority: index + 1,
      }));

      await this.categoriesModel.insertMany(fakeCategories);
      console.log('Fake categories seeded');
    } else {
      console.log('Categories already exist, skipping seeding');
    }
  }
}
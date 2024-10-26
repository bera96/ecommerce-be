import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import { faker } from '@faker-js/faker';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async seedUsers() {
    const userCount = await this.userModel.countDocuments();
    if (userCount === 0) {
      const fakeUsers = Array.from({ length: 10 }).map(() => ({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      }));

      await this.userModel.insertMany(fakeUsers);
      console.log('Fake users seeded');
    } else {
      console.log('Users already exist, skipping seeding');
    }
  }
}
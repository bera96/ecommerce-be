import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private usersModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const existingUser = await this.usersModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('This email is already in use.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.usersModel({
      ...createUserDto,
      password: hashedPassword,
    });

    await newUser.save();

    return newUser.toJSON();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.usersModel.findOne({ email });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersModel.findById(id).exec();
  }
}

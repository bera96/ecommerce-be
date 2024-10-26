import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './schemas/carts.schema';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private cartsModel: Model<Cart>,
  ) {}
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Orders } from './schemas/orders.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Orders.name) private ordersModel: Model<Orders>) {}

  async createOrder(order: CreateOrderDto): Promise<Orders> {
    const createdOrder = new this.ordersModel(order);
    return createdOrder.save();
  }

  async getAllOrders(userId: string): Promise<Orders[]> {
    return this.ordersModel.find({ userId });
  }
}

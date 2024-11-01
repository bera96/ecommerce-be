import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart } from './schemas/carts.schema';
import { ProductsService } from '../products/products.service';
import { UpdateCartDto } from './dto/update-cart.dto';
import { OrdersService } from '../orders/orders.service';
import { Orders } from '../orders/schemas/orders.schema';
import { randomUUID } from 'crypto';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService,
  ) {}

  async getCartByUserId(userId: string): Promise<Cart | null> {
    let cart = await this.cartModel.findOne({ userId }).exec();
    if (cart && cart.items) {
      cart.items = cart.items.map((item) => ({
        ...item,
        totalPrice: Number(item.totalPrice.toFixed(2)),
      }));
    }

    return cart;
  }

  async addProductToCart(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart> {
    const product = await this.productsService.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    let cart = await this.cartModel
      .findOne({ userId, status: 'unpaid' })
      .exec();

    if (!cart) {
      cart = new this.cartModel({ userId, items: [], expiresAt: new Date() });
    } else {
      cart.expiresAt = new Date();
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId: new Types.ObjectId(productId),
        quantity,
        price: product.price,
        totalPrice: product.price * quantity,
        image: product.image,
        name: product.name,
      });
    }

    return cart.save();
  }

  async updateCartItem(
    userId: string,
    updateCartDto: UpdateCartDto,
  ): Promise<Cart> {
    const cart = await this.cartModel.findOne({ userId }).exec();

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === updateCartDto.productId,
    );

    if (itemIndex === -1) {
      throw new NotFoundException('Product not found in cart');
    }

    if (updateCartDto.quantity === 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = updateCartDto.quantity;
      cart.expiresAt = new Date();
    }

    return cart.save();
  }

  async checkoutCart(userId: string): Promise<Orders> {
    const cart = await this.cartModel
      .findOne({ userId, status: 'unpaid' })
      .exec();
    if (!cart || cart.items.length === 0) {
      throw new NotFoundException('Cart not found or empty');
    }

    for (const item of cart.items) {
      const product = await this.productsService.findById(
        item.productId.toString(),
      );
      if (!product) {
        throw new NotFoundException(`Product not found: ${item.productId}`);
      }
      if (product.stock < item.quantity) {
        throw new BadRequestException(`Insufficient stock: ${product.name}`);
      }
      await this.productsService.updateStock(
        item.productId.toString(),
        product.stock - item.quantity,
      );
    }

    const order = await this.ordersService.createOrder({
      userId: cart.userId.toString(),
      items: cart.items,
      totalAmount: cart.totalAmount,
      trackingNumber: randomUUID(),
    });

    await this.cartModel.findByIdAndDelete(cart._id).exec();

    return order;
  }

  async clearCart(
    userId: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const result = await this.cartModel.deleteOne({ userId }).exec();

      if (result.deletedCount > 0) {
        return { success: true, message: 'Cart cleared successfully.' };
      } else {
        return { success: false, message: 'Cart not found.' };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Cart clearing error.',
      };
    }
  }
}

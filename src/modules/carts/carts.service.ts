import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart } from './schemas/carts.schema';
import { ProductsService } from '../products/products.service';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    private readonly productsService: ProductsService,
  ) {}

  async getCartByUserId(userId: string): Promise<Cart | null> {
    let cart = await this.cartModel.findOne({ userId }).exec();

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

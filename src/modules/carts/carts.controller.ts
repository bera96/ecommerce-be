import {
  Controller,
  Get,
  UseGuards,
  Req,
  NotFoundException,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { AddProductToCartDto } from './dto/add-product-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './schemas/carts.schema';

interface RequestWithUser extends Request {
  user: { userId: string };
}

@Controller('carts')
@UseGuards(JwtAuthGuard)
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get('me')
  async getMyCart(@Req() req: RequestWithUser) {
    const userId = req.user.userId;
    const cart = await this.cartsService.getCartByUserId(userId);
    if (!cart) {
      throw new NotFoundException('Your cart is empty');
    }
    return cart;
  }
  @Post('add')
  async addProductToCart(
    @Req() req: RequestWithUser,
    @Body() addProductToCartDto: AddProductToCartDto,
  ) {
    const userId = req.user.userId;
    return await this.cartsService.addProductToCart(
      userId,
      addProductToCartDto.productId,
      addProductToCartDto.quantity,
    );
  }

  @Delete('clear')
  async clearCart(@Req() req: RequestWithUser) {
    const userId = req.user.userId;
    return await this.cartsService.clearCart(userId);
  }

  @Put('update')
  async updateCartItem(
    @Req() req: RequestWithUser,
    @Body() updateCartDto: UpdateCartDto,
  ): Promise<Cart> {
    const userId = req.user.userId;
    return this.cartsService.updateCartItem(userId, updateCartDto);
  }
}

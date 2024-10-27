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
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { IRequestWithUser } from 'src/common/types/IRequestWithUser';



@ApiTags('carts')
@ApiBearerAuth('JWT-AUTH')
@Controller('carts')
@UseGuards(JwtAuthGuard)
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get my cart' })
  @ApiResponse({
    status: 200,
    description: 'Get my cart',
    type: Cart,
  })
  async getMyCart(@Req() req: IRequestWithUser) {
    const userId = req.user.userId;
    const cart = await this.cartsService.getCartByUserId(userId);
    if (!cart) {
      throw new NotFoundException('Your cart is empty');
    }
    return cart;
  }

  @Post('add')
  @ApiOperation({ summary: 'Add product to cart' })
  @ApiResponse({
    status: 200,
    description: 'Add product to cart',
    type: Cart,
  })
  async addProductToCart(
    @Req() req: IRequestWithUser,
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
  @ApiOperation({ summary: 'Clear cart' })
  @ApiResponse({
    status: 200,
    description: 'Clear cart',
    type: Cart,
  })
  async clearCart(@Req() req: IRequestWithUser) {
    const userId = req.user.userId;
    return await this.cartsService.clearCart(userId);
  }

  @Put('update')
  @ApiOperation({ summary: 'Update cart item' })
  @ApiResponse({
    status: 200,
    description: 'Update cart item',
    type: Cart,
  })
  async updateCartItem(
    @Req() req: IRequestWithUser,
    @Body() updateCartDto: UpdateCartDto,
  ): Promise<Cart> {
    const userId = req.user.userId;
    return this.cartsService.updateCartItem(userId, updateCartDto);
  }

  @Post('checkout')
  @ApiOperation({ summary: 'Checkout cart' })
  @ApiResponse({
    status: 200,
    description: 'Checkout cart',
    type: Cart,
  })
  async checkoutCart(@Req() req: IRequestWithUser) {
    const userId = req.user.userId;
    return this.cartsService.checkoutCart(userId);
  }
}

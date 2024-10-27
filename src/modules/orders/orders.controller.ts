import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Orders } from './schemas/orders.schema';
import { IRequestWithUser } from 'src/common/types/IRequestWithUser';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('orders')
@ApiBearerAuth('JWT-AUTH')
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get my orders' })
  @ApiResponse({
    status: 200,
    description: 'Get my orders',
    type: [Orders],
  })
  async getAllOrders(@Req() req: IRequestWithUser) {
    const userId = req.user.userId;
    return this.ordersService.getAllOrders(userId);
  }
}

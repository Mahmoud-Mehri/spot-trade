import {
  Controller,
  Post,
  Body,
  Request,
  Query,
  Get,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto } from 'src/application/dtos/order.dto';
import { JwtAuthGuard } from 'src/application/middlewares/jwt-guard';
import { OrderService } from 'src/application/services/order.service';

@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('buy')
  async createBuyOrder(@Body() data: CreateOrderDto, @Request() req: any) {
    const userId = req.user.id;

    return this.orderService.createBuyOrder(userId, data);
  }

  @Post('sell')
  async createSellOrder(@Body() data: CreateOrderDto, @Request() req: any) {
    const userId = req.user.id;

    return this.orderService.createSellOrder(userId, data);
  }

  @Get('')
  async getOrders(
    @Query('status') status: string | undefined,
    @Request() req: any,
  ) {
    const userId = req.user.id;
    const orderStatus = status ? status : null;

    return this.orderService.getOrders(userId, orderStatus);
  }
}

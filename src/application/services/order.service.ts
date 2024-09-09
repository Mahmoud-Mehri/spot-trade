import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from 'src/domains/order/repository.intf';
import { CreateOrderDto } from '../dtos/order.dto';
import { Order } from 'src/domains/order/models';
import { OrderStatus, OrderType, ServiceResponse } from 'src/common/types';

@Injectable()
export class OrderService {
  constructor(
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  async createBuyOrder(
    userId: string,
    orderInfo: CreateOrderDto,
  ): Promise<ServiceResponse> {
    const order = new Order(
      userId,
      OrderType.BUY,
      orderInfo.tokens,
      orderInfo.amount,
      orderInfo.price,
    );

    const newOrder = await this.orderRepository.createOrder(order);
    return new ServiceResponse(true, newOrder);
  }

  async createSellOrder(
    userId: string,
    orderInfo: CreateOrderDto,
  ): Promise<ServiceResponse> {
    const order = new Order(
      userId,
      OrderType.SELL,
      orderInfo.tokens,
      orderInfo.amount,
      orderInfo.price,
    );

    const newOrder = await this.orderRepository.createOrder(order);
    return new ServiceResponse(true, newOrder);
  }

  async getOrders(
    userId: string,
    status: string | null,
  ): Promise<ServiceResponse> {
    let orderStatus = null;
    if (status) {
      orderStatus =
        OrderStatus[status.toUpperCase() as keyof typeof OrderStatus];
    }

    const orders = await this.orderRepository.getOrders(userId, orderStatus);
    return new ServiceResponse(true, { orders });
  }
}

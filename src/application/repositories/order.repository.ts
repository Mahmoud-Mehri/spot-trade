import { Injectable } from '@nestjs/common';
import { Order } from '../../domains/order/models';
import { IOrderRepository } from 'src/domains/order/repository.intf';
import { OrderStatus } from 'src/common/types';

@Injectable()
export class OrderRepository implements IOrderRepository {
  private readonly orderList: Order[];

  constructor() {
    this.orderList = [];
  }

  createOrder(order: Order): Promise<Order> {
    // any modification on newOrder if needed
    this.orderList.push(order);

    // emulates returning a Promise, like when using DB
    return Promise.resolve(order);
  }

  getOrders(userId: string, status: OrderStatus | null): Promise<Order[]> {
    const orders = this.orderList.filter((order) => {
      return (
        order.userId === userId &&
        (!status || (status && order.status === status))
      );
    });

    return Promise.resolve(orders);
  }
}

import { OrderStatus } from 'src/common/types';
import { Order } from './models';

export interface IOrderRepository {
  createOrder(order: Order): Promise<Order>;
  getOrders(userId: string, status: OrderStatus | null): Promise<Order[]>;
}

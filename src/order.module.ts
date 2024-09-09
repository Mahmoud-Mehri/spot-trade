import { Module } from '@nestjs/common';
import { OrderService } from './application/services/order.service';
import { OrderRepository } from './application/repositories/order.repository';
import { OrderController } from './infrastructure/controllers/order.controller';

@Module({
  imports: [],
  providers: [
    OrderService,
    { provide: 'IOrderRepository', useClass: OrderRepository },
  ],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}

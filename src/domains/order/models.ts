import { OrderStatus, OrderType } from 'src/common/types';

export class Order {
  public id: string;
  public status: OrderStatus;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    public userId: string,
    public type: OrderType,
    public tokens: string,
    public amount: number,
    public price: number,
  ) {
    this.id = new Date().toISOString();
    this.status = OrderStatus.OPEN;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

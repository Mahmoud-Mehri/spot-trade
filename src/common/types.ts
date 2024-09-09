export enum OrderStatus {
  OPEN = 'open',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum OrderType {
  BUY = 'buy',
  SELL = 'sell',
}

export class ServiceResponse {
  constructor(
    public success: boolean,
    public data: Object,
  ) {}
}

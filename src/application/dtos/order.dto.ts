import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrderType } from 'src/common/types';

export class CreateOrderDto {
  @IsOptional()
  @IsEnum(OrderType)
  type: OrderType;

  @IsNotEmpty()
  @IsString()
  tokens: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}

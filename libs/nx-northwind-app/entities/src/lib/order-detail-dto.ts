import { BaseDto } from './base-dto';

export interface OrderDetailDto extends BaseDto {
  OrderID: string;
  ProductID?: null | string;
  UnitPrice?: number;
  Quantity?: number;
  Discount?: number;
}

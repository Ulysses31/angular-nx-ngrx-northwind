import { BaseDto } from './base-dto';

export interface OrderDetailLoaderDto extends BaseDto {
  OrderID: string;
  ProductID?: null | string;
  UnitPrice?: number;
  Quantity?: number;
  Discount?: number;
  SubTotal?: string;
  Total?: string;
}

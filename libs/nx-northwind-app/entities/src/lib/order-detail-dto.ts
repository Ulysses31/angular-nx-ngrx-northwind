import { BaseDto } from './base-dto';

export interface OrderDetailDto extends BaseDto {
  orderID?: null | string;
  productID?: null | string;
  unitPrice?: number;
  quantity?: number;
  discount?: number;
}

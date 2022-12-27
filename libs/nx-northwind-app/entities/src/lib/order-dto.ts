import { BaseDto } from './base-dto';

export interface OrderDto extends BaseDto {
  orderID?: null | string;
  customerID?: null | string;
  employeeID?: null | string;
  orderDate?: Date;
  requiredDate?: Date;
  shippedDate?: Date;
  shipVia?: null | string;
  freight?: null | string;
  shipName?: null | string;
  shipAddress?: null | string;
  shipCity?: null | string;
  shipRegion?: null | string;
  shipPostalCode?: null | string;
  shipCountry?: null | string;
}


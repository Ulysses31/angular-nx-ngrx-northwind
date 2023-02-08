import { BaseDto } from './base-dto';
import { OrderDetailDto } from './order-detail-dto';

export interface OrderMasterDetailDto extends BaseDto {
  OrderID: string;
  CustomerID?: null | string;
  EmployeeID?: null | string;
  OrderDate?: Date;
  RequiredDate?: Date;
  ShippedDate?: Date;
  ShipVia?: null | string;
  Freight?: null | string;
  ShipName?: null | string;
  ShipAddress?: null | string;
  ShipCity?: null | string;
  ShipRegion?: null | string;
  ShipPostalCode?: null | string;
  ShipCountry?: null | string;
  OrderDetails: OrderDetailDto[];
}

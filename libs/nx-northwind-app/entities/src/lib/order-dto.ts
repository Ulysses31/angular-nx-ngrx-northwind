import { BaseDto } from './base-dto';

export interface OrderDto extends BaseDto {
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
}

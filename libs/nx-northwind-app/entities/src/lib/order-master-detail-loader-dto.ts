import { BaseDto } from "./base-dto";

export interface OrderMasterDetailLoaderDto extends BaseDto  {
  OrderID: string;
  CustomerID?: null | string;
  LU_Customer?: null | string;
  EmployeeID?: null | string;
  LU_Employee?: null | string;
  OrderDate?: null | string;
  RequiredDate?: null | string;
  ShippedDate?: null | string;
  ShipVia?: null | string;
  LU_Shipper?: null | string;
  Freight?: null | string;
  ShipName?: null | string;
  ShipAddress?: null | string;
  ShipCity?: null | string;
  ShipRegion?: null | string;
  ShipPostalCode?: null | string;
  ShipCountry?: null | string;
}

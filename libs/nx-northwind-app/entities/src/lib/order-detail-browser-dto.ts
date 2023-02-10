export interface OrderDetailBrowserDto {
  OrderID: string;
  ProductID?: null | string;
  UnitPrice?: number;
  Quantity?: number;
  Discount?: number;
  SubTotal?: number;
  Total?: number;
}

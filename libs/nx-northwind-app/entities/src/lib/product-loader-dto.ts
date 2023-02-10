import { BaseDto } from './base-dto';

export interface ProductLoaderDto extends BaseDto {
  ProductID: string;
  ProductName?: null | string;
  SupplierID?: null | string;
  CategoryID?: null | string;
  QuantityPerUnit?: number;
  UnitPrice?: number;
  UnitsInStock?: number;
  UnitsOnOrder?: number;
  ReorderLevel?: null | string;
  Discontinued: boolean;
}

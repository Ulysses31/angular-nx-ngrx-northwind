import { BaseDto } from './base-dto';

export interface ProductLoaderDto extends BaseDto {
  ProductID: string;
  ProductName?: null | string;
  SupplierID?: null | string;
  LU_Supplier?: null | string;
  CategoryID?: null | string;
  LU_Category?: null | string;
  QuantityPerUnit: number;
  UnitPrice: number;
  UnitsInStock: number;
  UnitsOnOrder: number;
  ReorderLevel?: null | string;
  Discontinued: boolean;
}

import { BaseDto } from './base-dto';

export interface ProductDto extends BaseDto {
  productID: string;
  productName?: null | string;
  supplierID?: null | string;
  categoryID?: null | string;
  quantityPerUnit?: number;
  unitPrice?: number;
  unitsInStock?: number;
  unitsOnOrder?: number;
  reorderLevel?: null | string;
  discontinued: boolean;
}

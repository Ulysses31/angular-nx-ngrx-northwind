import { BaseDto } from './base-dto';

export interface CustomerLoaderDto extends BaseDto {
  CustomerID: string;
  CompanyName?: null | string;
  ContactName?: null | string;
  ContactTitle?: null | string;
  Address?: null | string;
  City?: null | string;
  Region?: null | string;
  PostalCode?: null | string;
  Country?: null | string;
  Phone?: null | string;
  Fax?: null | string;
}

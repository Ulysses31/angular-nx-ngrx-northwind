import { BaseDto } from './base-dto';

export interface CustomerDto extends BaseDto {
  customerID: string;
  companyName?: null | string;
  contactName?: null | string;
  contactTitle?: null | string;
  address?: null | string;
  city?: null | string;
  region?: null | string;
  postalCode?: null | string;
  country?: null | string;
  phone?: null | string;
  fax?: null | string;
}

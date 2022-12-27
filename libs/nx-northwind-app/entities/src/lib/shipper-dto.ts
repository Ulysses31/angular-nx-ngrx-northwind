import { BaseDto } from './base-dto';

export interface ShipperDto extends BaseDto {
  shipperID?: null | string;
  companyName?: null | string;
  phone?: null | string;
}

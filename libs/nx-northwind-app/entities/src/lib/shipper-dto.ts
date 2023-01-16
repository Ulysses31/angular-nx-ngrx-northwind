import { BaseDto } from './base-dto';

export interface ShipperDto extends BaseDto {
  shipperID: string;
  companyName?: null | string;
  phone?: null | string;
}

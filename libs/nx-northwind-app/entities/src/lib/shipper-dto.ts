import { BaseDto } from './base-dto';

export interface ShipperDto extends BaseDto {
  ShipperID: string;
  CompanyName?: null | string;
  Phone?: null | string;
}

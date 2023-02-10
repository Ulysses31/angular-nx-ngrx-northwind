import { BaseDto } from './base-dto';

export interface ShipperLoaderDto extends BaseDto {
  ShipperID: string;
  CompanyName?: null | string;
  Phone?: null | string;
}

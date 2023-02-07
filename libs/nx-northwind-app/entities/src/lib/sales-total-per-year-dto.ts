import { BaseDto } from './base-dto';

export interface SalesTotalPerYearDto extends BaseDto {
  Year?: null | string;
  TotalOrders?: null | string;
}

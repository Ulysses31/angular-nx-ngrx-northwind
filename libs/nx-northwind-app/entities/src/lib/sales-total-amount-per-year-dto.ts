import { BaseDto } from './base-dto';

export interface SalesTotalAmountPerYearDto extends BaseDto {
  Year?: null | string;
  TotalAmount?: null | string;
}

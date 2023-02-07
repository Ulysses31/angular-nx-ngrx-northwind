import { BaseDto } from './base-dto';

export interface CustomersCountPerYearDto extends BaseDto {
  Year?: null | string;
  Customers?: null | string;
}

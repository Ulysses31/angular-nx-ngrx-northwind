import { BaseDto } from './base-dto';

export interface CustomersCountOrdersPerYearDto extends BaseDto {
  Year?: null | string;
  Customer?: null | string;
  Total?: null | string;
}

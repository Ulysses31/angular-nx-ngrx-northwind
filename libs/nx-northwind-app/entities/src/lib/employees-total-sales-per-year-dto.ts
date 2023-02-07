import { BaseDto } from './base-dto';

export interface EmployeesTotalSalesPerYearDto extends BaseDto {
  Year?: null | string;
  Employee?: null | string;
  Total?: null | string;
}

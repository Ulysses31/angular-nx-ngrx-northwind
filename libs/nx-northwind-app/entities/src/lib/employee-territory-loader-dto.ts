import { BaseDto } from './base-dto';

export interface EmployeeTerritoryLoaderDto extends BaseDto {
  EmployeeID: string;
  LU_Employee?: null | string;
  TerritoryID?: null | string;
  LU_Territory?: null | string;
}

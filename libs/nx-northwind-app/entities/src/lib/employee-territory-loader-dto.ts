import { BaseDto } from './base-dto';

export interface EmployeeTerritoryLoaderDto extends BaseDto {
  EmployeeID: string;
  TerritoryID?: null | string;
}

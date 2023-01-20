import { BaseDto } from './base-dto';

export interface EmployeeTerritoryDto extends BaseDto {
  EmployeeID: string;
  TerritoryID?: null | string;
}

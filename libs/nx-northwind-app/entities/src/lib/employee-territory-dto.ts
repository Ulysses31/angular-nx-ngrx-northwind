import { BaseDto } from './base-dto';

export interface EmployeeTerritoryDto extends BaseDto {
  employeeID: string;
  territoryID?: null | string;
}

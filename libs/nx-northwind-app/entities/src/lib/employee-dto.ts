import { BaseDto } from './base-dto';

export interface EmployeeDto extends BaseDto {
  employeeID?: null | string;
  lastName?: null | string;
  firstName?: null | string;
  title?: null | string;
  titleOfCourtesy?: null | string;
  birthDate?: Date;
  hireDate?: Date;
  address?: null | string;
  city?: null | string;
  region?: null | string;
  postalCode?: null | string;
  country?: null | string;
  homePhone?: null | string;
  extension?: null | string;
  notes?: null | string;
  reportsTo?: null | string;
  photoPath?: null | string;
}

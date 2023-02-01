import { BaseDto } from './base-dto';

export interface EmployeeDto extends BaseDto {
  EmployeeID: string;
  LastName?: null | string;
  FirstName?: null | string;
  Title?: null | string;
  TitleOfCourtesy?: null | string;
  BirthDate?: null | string;
  HireDate?: null | string;
  Address?: null | string;
  City?: null | string;
  Region?: null | string;
  PostalCode?: null | string;
  Country?: null | string;
  HomePhone?: null | string;
  Extension?: null | string;
  Notes?: null | string;
  ReportsTo?: null | string;
  PhotoPath?: null | string;
}

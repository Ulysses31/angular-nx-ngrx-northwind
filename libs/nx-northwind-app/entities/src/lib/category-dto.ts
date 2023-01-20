import { BaseDto } from './base-dto';

export interface CategoryDto extends BaseDto {
  CategoryID: string;
  CategoryName?: null | string;
  Description?: null | string;
}

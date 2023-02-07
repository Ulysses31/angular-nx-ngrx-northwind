import { BaseDto } from './base-dto';

export interface SalesTotalPerCategoryDto extends BaseDto {
  Year?: null | string;
  CategoryName?: null | string;
  SubTotal?: null | string;
  Total?: null | string;
}

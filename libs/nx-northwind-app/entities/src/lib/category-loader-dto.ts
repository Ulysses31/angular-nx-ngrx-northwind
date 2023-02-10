import { BaseDto } from './base-dto';

export interface CategoryLoaderDto extends BaseDto {
  CategoryID: string;
  CategoryName?: null | string;
  Description?: null | string;
}

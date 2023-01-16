import { BaseDto } from './base-dto';

export interface CategoryDto extends BaseDto {
  categoryID: string;
  categoryName?: null | string;
  description?: null | string;
}

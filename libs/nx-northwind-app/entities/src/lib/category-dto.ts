import { BaseDto } from './base-dto';

export interface CategoryDto extends BaseDto {
  categoryID?: null | string;
  categoryName?: null | string;
  description?: null | string;
}


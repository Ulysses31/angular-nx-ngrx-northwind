import { BaseDto } from './base-dto';

export interface RegionLoaderDto extends BaseDto {
  RegionID: string;
  RegionDescription?: null | string;
}

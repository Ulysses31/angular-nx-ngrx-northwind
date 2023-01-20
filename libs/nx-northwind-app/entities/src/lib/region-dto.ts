import { BaseDto } from './base-dto';

export interface RegionDto extends BaseDto {
  RegionID: string;
  RegionDescription?: null | string;
}

import { BaseDto } from './base-dto';

export interface RegionDto extends BaseDto {
  regionID: string;
  regionDescription?: null | string;
}

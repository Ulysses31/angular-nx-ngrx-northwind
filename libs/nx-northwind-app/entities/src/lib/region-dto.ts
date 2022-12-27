import { BaseDto } from './base-dto';

export interface RegionDto extends BaseDto {
  regionID?: null | string;
  regionDescription?: null | string;
}

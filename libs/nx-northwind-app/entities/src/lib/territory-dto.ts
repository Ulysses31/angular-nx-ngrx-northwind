import { BaseDto } from './base-dto';

export interface TerritoryDto extends BaseDto {
  TerritoryID: string;
  TerritoryDescription?: null | string;
  RegionID?: null | string;
}

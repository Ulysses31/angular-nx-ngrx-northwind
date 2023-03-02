import { BaseDto } from './base-dto';

export interface TerritoryLoaderDto extends BaseDto {
  TerritoryID: string;
  TerritoryDescription?: null | string;
  RegionID?: null | string;
  LU_Region?: null | string;
}

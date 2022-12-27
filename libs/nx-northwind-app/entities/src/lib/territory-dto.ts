import { BaseDto } from './base-dto';

export interface TerritoryDto extends BaseDto {
  territoryID?: null | string;
  territoryDescription?: null | string;
  regionID?: null | string;
}

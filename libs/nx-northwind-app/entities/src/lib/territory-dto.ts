import { BaseDto } from './base-dto';

export interface TerritoryDto extends BaseDto {
  territoryID: string;
  territoryDescription?: null | string;
  regionID?: null | string;
}

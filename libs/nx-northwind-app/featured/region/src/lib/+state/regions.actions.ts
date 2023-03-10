/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, props } from '@ngrx/store';
import {
  RegionBrowserDto,
  RegionLoaderDto
} from '@nx-northwind/nx-northwind-app/entities';

// *********** INIT REGIONS *************************************//
export const initRegions = createAction('[Regions Page] Init');

export const loadRegionsSuccess = createAction(
  '[Regions/API] Load Regions Success',
  props<{ regions: RegionBrowserDto[] }>()
);

export const loadRegionsFailure = createAction(
  '[Regions/API] Load Regions Failure',
  props<{ error: any }>()
);

// *********** SELECTED REGION ***********************************//
export const initRegion = createAction(
  '[Region Page] Init',
  props<{ selectedId: string }>()
);

export const loadRegionSuccess = createAction(
  '[Regions/API] Load Region Success',
  props<{ region: RegionLoaderDto }>()
);

export const loadRegionFailure = createAction(
  '[Regions/API] Load Region Failure',
  props<{ error: any }>()
);

// *********** POST REGION **************************************//
export const postRegion = createAction(
  '[Region Page] Post',
  props<{ newRegion: RegionLoaderDto }>()
);

export const postRegionSuccess = createAction(
  '[Regions/API] Post Region Success',
  props<{ region: RegionLoaderDto }>()
);

export const postRegionFailure = createAction(
  '[Regions/API] Post Region Failure',
  props<{ error: any }>()
);

// *********** PUT REGION ***************************************//
export const putRegion = createAction(
  '[Region Page] Put',
  props<{ selectedId: string; putRegion: RegionLoaderDto }>()
);

export const putRegionSuccess = createAction(
  '[Regions/API] Put Region Success',
  props<{ region: RegionLoaderDto }>()
);

export const putRegionFailure = createAction(
  '[Regions/API] Put Region Failure',
  props<{ error: any }>()
);

// *********** DELETE REGION ************************************//
export const deleteRegion = createAction(
  '[Region Page] Delete',
  props<{ delRegion: RegionLoaderDto }>()
);

export const deleteRegionSuccess = createAction(
  '[Regions/API] Delete Region Success'
);

export const deleteRegionFailure = createAction(
  '[Regions/API] Delete Region Failure',
  props<{ error: any }>()
);

import { createAction, props } from '@ngrx/store';
import { RegionsEntity } from './regions.models';

export const initRegions = createAction('[Regions Page] Init');

export const loadRegionsSuccess = createAction(
  '[Regions/API] Load Regions Success',
  props<{ regions: RegionsEntity[] }>()
);

export const loadRegionsFailure = createAction(
  '[Regions/API] Load Regions Failure',
  props<{ error: any }>()
);

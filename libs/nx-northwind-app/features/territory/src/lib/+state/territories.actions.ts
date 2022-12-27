import { createAction, props } from '@ngrx/store';
import { TerritoriesEntity } from './territories.models';

export const initTerritories = createAction(
  '[Territories Page] Init'
);

export const loadTerritoriesSuccess = createAction(
  '[Territories/API] Load Territories Success',
  props<{ territories: TerritoriesEntity[] }>()
);

export const loadTerritoriesFailure = createAction(
  '[Territories/API] Load Territories Failure',
  props<{ error: any }>()
);

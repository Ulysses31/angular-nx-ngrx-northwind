/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, props } from '@ngrx/store';
import { TerritoryDto } from '@nx-northwind/nx-northwind-app/entities';

// *********** INIT TERRITORIES *************************************//
export const initTerritories = createAction(
  '[Territories Page] Init'
);

export const loadTerritoriesSuccess = createAction(
  '[Territories/API] Load Territories Success',
  props<{ territories: TerritoryDto[] }>()
);

export const loadTerritoriesFailure = createAction(
  '[Territories/API] Load Territories Failure',
  props<{ error: any }>()
);

// *********** SELECTED TERRITORY ***********************************//
export const initTerritory = createAction(
  '[Territory Page] Init',
  props<{ selectedId: string }>()
);

export const loadTerritorySuccess = createAction(
  '[Territories/API] Load Territory Success',
  props<{ territory: TerritoryDto }>()
);

export const loadTerritoryFailure = createAction(
  '[Territories/API] Load Territory Failure',
  props<{ error: any }>()
);

// *********** POST TERRITORY **************************************//
export const postTerritory = createAction(
  '[Territory Page] Post',
  props<{ newTerritory: TerritoryDto }>()
);

export const postTerritorySuccess = createAction(
  '[Territories/API] Post Territory Success',
  props<{ territory: TerritoryDto }>()
);

export const postTerritoryFailure = createAction(
  '[Territories/API] Post Territory Failure',
  props<{ error: any }>()
);

// *********** PUT TERRITORY ***************************************//
export const putTerritory = createAction(
  '[Territory Page] Put',
  props<{ selectedId: string; putTerritory: TerritoryDto }>()
);

export const putTerritorySuccess = createAction(
  '[Territories/API] Put Territory Success',
  props<{ territory: TerritoryDto }>()
);

export const putTerritoryFailure = createAction(
  '[Territories/API] Put Territory Failure',
  props<{ error: any }>()
);

// *********** DELETE TERRITORY ************************************//
export const deleteTerritory = createAction(
  '[Territory Page] Delete',
  props<{ delTerritory: TerritoryDto }>()
);

export const deleteTerritorySuccess = createAction(
  '[Territories/API] Delete Territory Success'
);

export const deleteTerritoryFailure = createAction(
  '[Territories/API] Delete Territory Failure',
  props<{ error: any }>()
);

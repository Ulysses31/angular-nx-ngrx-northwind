/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store';
import {
  RegionBrowserDto,
  TerritoryBrowserDto,
  TerritoryLoaderDto
} from '@nx-northwind/nx-northwind-app/entities';

import * as TerritoriesActions from './territories.actions';

export const TERRITORIES_FEATURE_KEY = 'territories';

export interface TerritoriesState {
  territories: TerritoryBrowserDto[];
  territory: TerritoryLoaderDto | any;
  regions: RegionBrowserDto[];
  loaded: boolean;
  error?: string | null;
}

export const initialTerritoriesState: TerritoriesState = {
  territories: [],
  territory: {},
  regions: [],
  loaded: false,
  error: null
};

const reducer = createReducer(
  initialTerritoriesState,
  // *********** SELECTED REGION ****************************//
  on(TerritoriesActions.initTerritoryRegions, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(
    TerritoriesActions.loadTerritoryRegionsSuccess,
    (state, { regions }) => ({
      ...state,
      regions,
      loaded: true,
      error: null
    })
  ),
  on(
    TerritoriesActions.loadTerritoryRegionsFailure,
    (state, { error }) => ({
      ...state,
      regions: [],
      loaded: true,
      error
    })
  ),
  // *********** INIT TERRITORIES ******************************//
  on(TerritoriesActions.initTerritories, (state) => ({
    ...state,
    territory: {},
    loaded: false,
    error: null
  })),
  on(
    TerritoriesActions.loadTerritoriesSuccess,
    (state, { territories }) => ({
      ...state,
      territories,
      territory: {},
      loaded: true,
      error: null
    })
  ),
  on(
    TerritoriesActions.loadTerritoriesFailure,
    (state, { error }) => ({
      ...state,
      territories: [],
      territory: {},
      loaded: true,
      error
    })
  ),
  // *********** SELECTED TERRITORY ****************************//
  on(TerritoriesActions.initTerritory, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(
    TerritoriesActions.loadTerritorySuccess,
    (state, { territory }) => ({
      ...state,
      territory,
      loaded: true,
      error: null
    })
  ),
  on(TerritoriesActions.loadTerritoryFailure, (state, { error }) => ({
    ...state,
    territory: {},
    loaded: true,
    error
  })),
  // *********** POST TERRITORY *******************************//
  on(TerritoriesActions.postTerritory, (state, { newTerritory }) => ({
    ...state,
    territory: newTerritory,
    loaded: false,
    error: null
  })),
  on(
    TerritoriesActions.postTerritorySuccess,
    (state, { territory }) => ({
      ...state,
      territory,
      loaded: true,
      error: null
    })
  ),
  on(TerritoriesActions.postTerritoryFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  })),
  // *********** PUT TERRITORY *******************************//
  on(TerritoriesActions.putTerritory, (state, { putTerritory }) => ({
    ...state,
    territory: putTerritory,
    loaded: false,
    error: null
  })),
  on(
    TerritoriesActions.putTerritorySuccess,
    (state, { territory }) => ({
      ...state,
      territory,
      loaded: true,
      error: null
    })
  ),
  on(TerritoriesActions.putTerritoryFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  })),
  // *********** DELETE TERRITORY ****************************//
  on(
    TerritoriesActions.deleteTerritory,
    (state, { delTerritory }) => ({
      ...state,
      territory: delTerritory,
      loaded: false,
      error: null
    })
  ),
  on(TerritoriesActions.deleteTerritorySuccess, (state) => ({
    ...state,
    loaded: true,
    error: null
  })),
  on(
    TerritoriesActions.deleteTerritoryFailure,
    (state, { error }) => ({
      ...state,
      loaded: true,
      error
    })
  )
);

export function territoriesReducer(
  state: TerritoriesState | undefined,
  action: Action
) {
  return reducer(state, action);
}

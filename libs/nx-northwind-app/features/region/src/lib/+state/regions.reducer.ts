/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, createReducer, on } from '@ngrx/store';
import { RegionDto } from '@nx-northwind/nx-northwind-app/entities';

import * as RegionsActions from './regions.actions';

export const REGIONS_FEATURE_KEY = 'regions';

export interface RegionsState {
  regions: RegionDto[];
  region: RegionDto | any;
  loaded: boolean;
  error?: string | null;
}

export const initialRegionsState: RegionsState = {
  regions: [],
  region: {},
  loaded: false,
  error: null
};

const reducer = createReducer(
  initialRegionsState,
  // *********** INIT CATEGORIES ******************************//
  on(RegionsActions.initRegions, (state) => ({
    ...state,
    region: {},
    loaded: false,
    error: null
  })),
  on(RegionsActions.loadRegionsSuccess, (state, { regions }) => ({
    ...state,
    regions,
    region: {},
    loaded: true,
    error: null
  })),
  on(RegionsActions.loadRegionsFailure, (state, { error }) => ({
    ...state,
    regions: [],
    region: {},
    loaded: true,
    error
  })),
  // *********** SELECTED CATEGORY ****************************//
  on(RegionsActions.initRegion, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(RegionsActions.loadRegionSuccess, (state, { region }) => ({
    ...state,
    region,
    loaded: true,
    error: null
  })),
  on(RegionsActions.loadRegionFailure, (state, { error }) => ({
    ...state,
    region: {},
    loaded: true,
    error
  })),
  // *********** POST CATEGORY *******************************//
  on(RegionsActions.postRegion, (state, { newRegion }) => ({
    ...state,
    region: newRegion,
    loaded: false,
    error: null
  })),
  on(RegionsActions.postRegionSuccess, (state, { region }) => ({
    ...state,
    region,
    loaded: true,
    error: null
  })),
  on(RegionsActions.postRegionFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  })),
  // *********** PUT CATEGORY *******************************//
  on(RegionsActions.putRegion, (state, { putRegion }) => ({
    ...state,
    region: putRegion,
    loaded: false,
    error: null
  })),
  on(RegionsActions.putRegionSuccess, (state, { region }) => ({
    ...state,
    region,
    loaded: true,
    error: null
  })),
  on(RegionsActions.putRegionFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  })),
  // *********** DELETE CATEGORY ****************************//
  on(RegionsActions.deleteRegion, (state, { delRegion }) => ({
    ...state,
    region: delRegion,
    loaded: false,
    error: null
  })),
  on(RegionsActions.deleteRegionSuccess, (state) => ({
    ...state,
    loaded: true,
    error: null
  })),
  on(RegionsActions.deleteRegionFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error
  }))
);

export function regionsReducer(
  state: RegionsState | undefined,
  action: Action
) {
  return reducer(state, action);
}

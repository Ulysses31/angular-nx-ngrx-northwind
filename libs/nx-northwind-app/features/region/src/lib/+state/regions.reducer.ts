import {
  EntityState,
  EntityAdapter,
  createEntityAdapter
} from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as RegionsActions from './regions.actions';
import { RegionsEntity } from './regions.models';

export const REGIONS_FEATURE_KEY = 'regions';

export interface RegionsState extends EntityState<RegionsEntity> {
  selectedId?: string | number; // which Regions record has been selected
  loaded: boolean; // has the Regions list been loaded
  error?: string | null; // last known error (if any)
}

export interface RegionsPartialState {
  readonly [REGIONS_FEATURE_KEY]: RegionsState;
}

export const regionsAdapter: EntityAdapter<RegionsEntity> =
  createEntityAdapter<RegionsEntity>();

export const initialRegionsState: RegionsState =
  regionsAdapter.getInitialState({
    // set initial required properties
    loaded: false
  });

const reducer = createReducer(
  initialRegionsState,
  on(RegionsActions.initRegions, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(RegionsActions.loadRegionsSuccess, (state, { regions }) =>
    regionsAdapter.setAll(regions, { ...state, loaded: true })
  ),
  on(RegionsActions.loadRegionsFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function regionsReducer(
  state: RegionsState | undefined,
  action: Action
) {
  return reducer(state, action);
}

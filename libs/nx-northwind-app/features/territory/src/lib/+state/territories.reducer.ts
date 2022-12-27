import {
  EntityState,
  EntityAdapter,
  createEntityAdapter
} from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as TerritoriesActions from './territories.actions';
import { TerritoriesEntity } from './territories.models';

export const TERRITORIES_FEATURE_KEY = 'territories';

export interface TerritoriesState
  extends EntityState<TerritoriesEntity> {
  selectedId?: string | number; // which Territories record has been selected
  loaded: boolean; // has the Territories list been loaded
  error?: string | null; // last known error (if any)
}

export interface TerritoriesPartialState {
  readonly [TERRITORIES_FEATURE_KEY]: TerritoriesState;
}

export const territoriesAdapter: EntityAdapter<TerritoriesEntity> =
  createEntityAdapter<TerritoriesEntity>();

export const initialTerritoriesState: TerritoriesState =
  territoriesAdapter.getInitialState({
    // set initial required properties
    loaded: false
  });

const reducer = createReducer(
  initialTerritoriesState,
  on(TerritoriesActions.initTerritories, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(
    TerritoriesActions.loadTerritoriesSuccess,
    (state, { territories }) =>
      territoriesAdapter.setAll(territories, {
        ...state,
        loaded: true
      })
  ),
  on(
    TerritoriesActions.loadTerritoriesFailure,
    (state, { error }) => ({ ...state, error })
  )
);

export function territoriesReducer(
  state: TerritoriesState | undefined,
  action: Action
) {
  return reducer(state, action);
}

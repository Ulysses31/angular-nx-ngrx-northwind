import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  TERRITORIES_FEATURE_KEY,
  TerritoriesState,
  territoriesAdapter
} from './territories.reducer';

// Lookup the 'Territories' feature state managed by NgRx
export const getTerritoriesState =
  createFeatureSelector<TerritoriesState>(TERRITORIES_FEATURE_KEY);

const { selectAll, selectEntities } =
  territoriesAdapter.getSelectors();

export const getTerritoriesLoaded = createSelector(
  getTerritoriesState,
  (state: TerritoriesState) => state.loaded
);

export const getTerritoriesError = createSelector(
  getTerritoriesState,
  (state: TerritoriesState) => state.error
);

export const getAllTerritories = createSelector(
  getTerritoriesState,
  (state: TerritoriesState) => selectAll(state)
);

export const getTerritoriesEntities = createSelector(
  getTerritoriesState,
  (state: TerritoriesState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getTerritoriesState,
  (state: TerritoriesState) => state.selectedId
);

export const getSelected = createSelector(
  getTerritoriesEntities,
  getSelectedId,
  (entities, selectedId) =>
    selectedId ? entities[selectedId] : undefined
);

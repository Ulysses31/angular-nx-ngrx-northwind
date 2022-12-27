import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  REGIONS_FEATURE_KEY,
  RegionsState,
  regionsAdapter
} from './regions.reducer';

// Lookup the 'Regions' feature state managed by NgRx
export const getRegionsState = createFeatureSelector<RegionsState>(
  REGIONS_FEATURE_KEY
);

const { selectAll, selectEntities } = regionsAdapter.getSelectors();

export const getRegionsLoaded = createSelector(
  getRegionsState,
  (state: RegionsState) => state.loaded
);

export const getRegionsError = createSelector(
  getRegionsState,
  (state: RegionsState) => state.error
);

export const getAllRegions = createSelector(
  getRegionsState,
  (state: RegionsState) => selectAll(state)
);

export const getRegionsEntities = createSelector(
  getRegionsState,
  (state: RegionsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getRegionsState,
  (state: RegionsState) => state.selectedId
);

export const getSelected = createSelector(
  getRegionsEntities,
  getSelectedId,
  (entities, selectedId) =>
    selectedId ? entities[selectedId] : undefined
);

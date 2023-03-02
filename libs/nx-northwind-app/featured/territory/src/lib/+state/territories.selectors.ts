import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  TerritoriesState,
  TERRITORIES_FEATURE_KEY
} from './territories.reducer';

export const selectTerritoriesState =
  createFeatureSelector<TerritoriesState>(TERRITORIES_FEATURE_KEY);

export const selectTerritoriesLoaded = createSelector(
  selectTerritoriesState,
  (state: TerritoriesState) => {
    return state.loaded;
  }
);

export const selectTerritoriesError = createSelector(
  selectTerritoriesState,
  (state: TerritoriesState) => {
    return state.error;
  }
);

export const selectAllTerritories = createSelector(
  selectTerritoriesState,
  (state: TerritoriesState) => {
    return state.territories;
  }
);

export const selectTerritory = createSelector(
  selectTerritoriesState,
  (state: TerritoriesState) => {
    return state.territory;
  }
);

export const selectTerritoryRegions = createSelector(
  selectTerritoriesState,
  (state: TerritoriesState) => {
    return state.regions;
  }
);

// export const selectSelectedTerritory = createSelector(
//   selectAllTerritories,
//   selectSelectedId,
//   (categories, selectedId) =>
//     selectedId
//       ? categories.find((item) => item.id === selectedId)
//       : undefined
// );

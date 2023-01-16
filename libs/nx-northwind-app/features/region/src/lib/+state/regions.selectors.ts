import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RegionsState, REGIONS_FEATURE_KEY } from './regions.reducer';

export const selectRegionsState = createFeatureSelector<RegionsState>(
  REGIONS_FEATURE_KEY
);

export const selectRegionsLoaded = createSelector(
  selectRegionsState,
  (state: RegionsState) => {
    return state.loaded;
  }
);

export const selectRegionsError = createSelector(
  selectRegionsState,
  (state: RegionsState) => {
    return state.error;
  }
);

export const selectAllRegions = createSelector(
  selectRegionsState,
  (state: RegionsState) => {
    return state.regions;
  }
);

export const selectRegion = createSelector(
  selectRegionsState,
  (state: RegionsState) => {
    return state.region;
  }
);

// export const selectSelectedRegion = createSelector(
//   selectAllRegions,
//   selectSelectedId,
//   (categories, selectedId) =>
//     selectedId
//       ? categories.find((item) => item.id === selectedId)
//       : undefined
// );

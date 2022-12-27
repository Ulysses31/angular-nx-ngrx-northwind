import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SHIPPERS_FEATURE_KEY,
  ShippersState,
  shippersAdapter
} from './shippers.reducer';

// Lookup the 'Shippers' feature state managed by NgRx
export const getShippersState = createFeatureSelector<ShippersState>(
  SHIPPERS_FEATURE_KEY
);

const { selectAll, selectEntities } = shippersAdapter.getSelectors();

export const getShippersLoaded = createSelector(
  getShippersState,
  (state: ShippersState) => state.loaded
);

export const getShippersError = createSelector(
  getShippersState,
  (state: ShippersState) => state.error
);

export const getAllShippers = createSelector(
  getShippersState,
  (state: ShippersState) => selectAll(state)
);

export const getShippersEntities = createSelector(
  getShippersState,
  (state: ShippersState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getShippersState,
  (state: ShippersState) => state.selectedId
);

export const getSelected = createSelector(
  getShippersEntities,
  getSelectedId,
  (entities, selectedId) =>
    selectedId ? entities[selectedId] : undefined
);

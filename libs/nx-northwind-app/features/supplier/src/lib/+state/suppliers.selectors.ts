import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SUPPLIERS_FEATURE_KEY,
  SuppliersState,
  suppliersAdapter
} from './suppliers.reducer';

// Lookup the 'Suppliers' feature state managed by NgRx
export const getSuppliersState =
  createFeatureSelector<SuppliersState>(SUPPLIERS_FEATURE_KEY);

const { selectAll, selectEntities } = suppliersAdapter.getSelectors();

export const getSuppliersLoaded = createSelector(
  getSuppliersState,
  (state: SuppliersState) => state.loaded
);

export const getSuppliersError = createSelector(
  getSuppliersState,
  (state: SuppliersState) => state.error
);

export const getAllSuppliers = createSelector(
  getSuppliersState,
  (state: SuppliersState) => selectAll(state)
);

export const getSuppliersEntities = createSelector(
  getSuppliersState,
  (state: SuppliersState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getSuppliersState,
  (state: SuppliersState) => state.selectedId
);

export const getSelected = createSelector(
  getSuppliersEntities,
  getSelectedId,
  (entities, selectedId) =>
    selectedId ? entities[selectedId] : undefined
);

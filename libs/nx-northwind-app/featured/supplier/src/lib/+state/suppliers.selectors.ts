import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SuppliersState,
  SUPPLIERS_FEATURE_KEY
} from './suppliers.reducer';

export const selectSuppliersState =
  createFeatureSelector<SuppliersState>(SUPPLIERS_FEATURE_KEY);

export const selectSuppliersLoaded = createSelector(
  selectSuppliersState,
  (state: SuppliersState) => {
    return state.loaded;
  }
);

export const selectSuppliersError = createSelector(
  selectSuppliersState,
  (state: SuppliersState) => {
    return state.error;
  }
);

export const selectAllSuppliers = createSelector(
  selectSuppliersState,
  (state: SuppliersState) => {
    return state.suppliers;
  }
);

export const selectSupplier = createSelector(
  selectSuppliersState,
  (state: SuppliersState) => {
    return state.supplier;
  }
);

// export const selectSelectedSupplier = createSelector(
//   selectAllSuppliers,
//   selectSelectedId,
//   (suppliers, selectedId) =>
//     selectedId
//       ? suppliers.find((item) => item.id === selectedId)
//       : undefined
// );

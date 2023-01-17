import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ShippersState,
  SHIPPERS_FEATURE_KEY
} from './shippers.reducer';

export const selectShippersState =
  createFeatureSelector<ShippersState>(SHIPPERS_FEATURE_KEY);

export const selectShippersLoaded = createSelector(
  selectShippersState,
  (state: ShippersState) => {
    return state.loaded;
  }
);

export const selectShippersError = createSelector(
  selectShippersState,
  (state: ShippersState) => {
    return state.error;
  }
);

export const selectAllShippers = createSelector(
  selectShippersState,
  (state: ShippersState) => {
    return state.shippers;
  }
);

export const selectShipper = createSelector(
  selectShippersState,
  (state: ShippersState) => {
    return state.shipper;
  }
);

// export const selectSelectedShipper = createSelector(
//   selectAllShippers,
//   selectSelectedId,
//   (shippers, selectedId) =>
//     selectedId
//       ? shippers.find((item) => item.id === selectedId)
//       : undefined
// );

import { createAction, props } from '@ngrx/store';
import { SuppliersEntity } from './suppliers.models';

export const initSuppliers = createAction('[Suppliers Page] Init');

export const loadSuppliersSuccess = createAction(
  '[Suppliers/API] Load Suppliers Success',
  props<{ suppliers: SuppliersEntity[] }>()
);

export const loadSuppliersFailure = createAction(
  '[Suppliers/API] Load Suppliers Failure',
  props<{ error: any }>()
);

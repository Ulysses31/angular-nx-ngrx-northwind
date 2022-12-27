import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { nxNorthwindAppFeaturesSupplierRoutes } from './lib.routes';
import { SupplierLoaderComponent } from './supplier-loader/supplier-loader.component';
import { SupplierBrowserComponent } from './supplier-browser/supplier-browser.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromSuppliers from './+state/suppliers.reducer';
import { SuppliersEffects } from './+state/suppliers.effects';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(nxNorthwindAppFeaturesSupplierRoutes),

    StoreModule.forFeature(
      fromSuppliers.SUPPLIERS_FEATURE_KEY,
      fromSuppliers.suppliersReducer
    ),

    EffectsModule.forFeature([SuppliersEffects])
  ],
  declarations: [SupplierLoaderComponent, SupplierBrowserComponent]
})
export class NxNorthwindAppFeaturesSupplierModule {}

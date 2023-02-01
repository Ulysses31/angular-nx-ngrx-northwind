import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NxMaterialUiModule } from '@nx-northwind/nx-material-ui';
import { NxNorthwindAppFeaturedSharedModule } from '@nx-northwind/nx-northwind-app/featured/shared';
import { SuppliersEffects } from './+state/suppliers.effects';
import * as fromSuppliers from './+state/suppliers.reducer';
import { nxNorthwindAppFeaturesSupplierRoutes } from './lib.routes';
import { SupplierBrowserComponent } from './supplier-browser/supplier-browser.component';
import { SupplierLoaderComponent } from './supplier-loader/supplier-loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NxNorthwindAppFeaturedSharedModule,
    NxMaterialUiModule,
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

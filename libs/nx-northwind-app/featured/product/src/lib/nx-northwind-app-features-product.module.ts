import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NxMaterialUiModule } from '@nx-northwind/nx-material-ui';
import { NxNorthwindAppFeaturedSharedModule } from '@nx-northwind/nx-northwind-app/featured/shared';
import { ProductsEffects } from './+state/products.effects';
import * as fromProducts from './+state/products.reducer';
import { nxNorthwindAppFeaturesProductRoutes } from './lib.routes';
import { ProductBrowserComponent } from './product-browser/product-browser.component';
import { ProductLoaderComponent } from './product-loader/product-loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NxNorthwindAppFeaturedSharedModule,
    NxMaterialUiModule,
    RouterModule.forChild(nxNorthwindAppFeaturesProductRoutes),

    StoreModule.forFeature(
      fromProducts.PRODUCTS_FEATURE_KEY,
      fromProducts.productsReducer
    ),

    EffectsModule.forFeature([ProductsEffects])
  ],
  declarations: [ProductBrowserComponent, ProductLoaderComponent],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    }
  ]
})
export class NxNorthwindAppFeaturesProductModule {}

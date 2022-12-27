import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { nxNorthwindAppFeaturesProductRoutes } from './lib.routes';
import { ProductBrowserComponent } from './product-browser/product-browser.component';
import { ProductLoaderComponent } from './product-loader/product-loader.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromProducts from './+state/products.reducer';
import { ProductsEffects } from './+state/products.effects';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(nxNorthwindAppFeaturesProductRoutes),

    StoreModule.forFeature(
      fromProducts.PRODUCTS_FEATURE_KEY,
      fromProducts.productsReducer
    ),

    EffectsModule.forFeature([ProductsEffects])
  ],
  declarations: [ProductBrowserComponent, ProductLoaderComponent]
})
export class NxNorthwindAppFeaturesProductModule {}

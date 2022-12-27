import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { nxNorthwindAppFeaturesShipperRoutes } from './lib.routes';
import { ShipperBrowserComponent } from './shipper-browser/shipper-browser.component';
import { ShipperLoaderComponent } from './shipper-loader/shipper-loader.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromShippers from './+state/shippers.reducer';
import { ShippersEffects } from './+state/shippers.effects';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(nxNorthwindAppFeaturesShipperRoutes),

    StoreModule.forFeature(
      fromShippers.SHIPPERS_FEATURE_KEY,
      fromShippers.shippersReducer
    ),

    EffectsModule.forFeature([ShippersEffects])
  ],
  declarations: [ShipperBrowserComponent, ShipperLoaderComponent]
})
export class NxNorthwindAppFeaturesShipperModule {}

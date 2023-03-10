import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NxMaterialUiModule } from '@nx-northwind/nx-material-ui';
import { NxNorthwindAppFeaturedSharedModule } from '@nx-northwind/nx-northwind-app/featured/shared';
import { ShippersEffects } from './+state/shippers.effects';
import * as fromShippers from './+state/shippers.reducer';
import { nxNorthwindAppFeaturesShipperRoutes } from './lib.routes';
import { ShipperBrowserComponent } from './shipper-browser/shipper-browser.component';
import { ShipperLoaderComponent } from './shipper-loader/shipper-loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NxNorthwindAppFeaturedSharedModule,
    NxMaterialUiModule,
    MatDialogModule,
    RouterModule.forChild(nxNorthwindAppFeaturesShipperRoutes),

    StoreModule.forFeature(
      fromShippers.SHIPPERS_FEATURE_KEY,
      fromShippers.shippersReducer
    ),

    EffectsModule.forFeature([ShippersEffects])
  ],
  declarations: [ShipperBrowserComponent, ShipperLoaderComponent],
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
export class NxNorthwindAppFeaturesShipperModule {}

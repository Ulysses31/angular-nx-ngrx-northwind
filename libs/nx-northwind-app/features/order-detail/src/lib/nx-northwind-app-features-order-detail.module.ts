import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { nxNorthwindAppFeaturesOrderDetailRoutes } from './lib.routes';
import { OrderDetailLoaderComponent } from './order-detail-loader/order-detail-loader.component';
import { OrderDetailBrowserComponent } from './order-detail-browser/order-detail-browser.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromOrderDetails from './+state/order-details.reducer';
import { OrderDetailsEffects } from './+state/order-details.effects';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(nxNorthwindAppFeaturesOrderDetailRoutes),

    StoreModule.forFeature(
      fromOrderDetails.ORDER_DETAILS_FEATURE_KEY,
      fromOrderDetails.oderDetailsReducer
    ),

    EffectsModule.forFeature([OrderDetailsEffects])
  ],
  declarations: [
    OrderDetailLoaderComponent,
    OrderDetailBrowserComponent
  ]
})
export class NxNorthwindAppFeaturesOrderDetailModule {}

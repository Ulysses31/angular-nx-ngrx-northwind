import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NxMaterialUiModule } from '@nx-northwind/nx-material-ui';
import { NxNorthwindAppFeaturedSharedModule } from '@nx-northwind/nx-northwind-app/featured/shared';
import { OrderDetailsEffects } from './+state/order-details.effects';
import * as fromOrderDetails from './+state/order-details.reducer';
import { nxNorthwindAppFeaturesOrderDetailRoutes } from './lib.routes';
import { OrderDetailBrowserComponent } from './order-detail-browser/order-detail-browser.component';
import { OrderDetailLoaderComponent } from './order-detail-loader/order-detail-loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NxNorthwindAppFeaturedSharedModule,
    NxMaterialUiModule,
    RouterModule.forChild(nxNorthwindAppFeaturesOrderDetailRoutes),

    StoreModule.forFeature(
      fromOrderDetails.ORDER_DETAILS_FEATURE_KEY,
      fromOrderDetails.orderDetailsReducer
    ),

    EffectsModule.forFeature([OrderDetailsEffects])
  ],
  declarations: [
    OrderDetailLoaderComponent,
    OrderDetailBrowserComponent
  ]
})
export class NxNorthwindAppFeaturesOrderDetailModule {}

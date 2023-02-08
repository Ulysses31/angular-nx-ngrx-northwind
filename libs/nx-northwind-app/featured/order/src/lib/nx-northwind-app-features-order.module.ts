import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NxMaterialUiModule } from '@nx-northwind/nx-material-ui';
import { NxNorthwindAppFeaturedSharedModule } from '@nx-northwind/nx-northwind-app/featured/shared';
import { OrdersEffects } from './+state/orders.effects';
import * as fromOrders from './+state/orders.reducer';
import { nxNorthwindAppFeaturesOrderRoutes } from './lib.routes';
import { OrderBrowserComponent } from './order-browser/order-browser.component';
import { OrderLoaderComponent } from './order-loader/order-loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NxNorthwindAppFeaturedSharedModule,
    NxMaterialUiModule,
    RouterModule.forChild(nxNorthwindAppFeaturesOrderRoutes),

    StoreModule.forFeature(
      fromOrders.ORDERS_FEATURE_KEY,
      fromOrders.ordersReducer
    ),

    EffectsModule.forFeature([OrdersEffects])
  ],
  declarations: [OrderBrowserComponent, OrderLoaderComponent]
})
export class NxNorthwindAppFeaturesOrderModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { nxNorthwindAppFeaturesOrderRoutes } from './lib.routes';
import { OrderBrowserComponent } from './order-browser/order-browser.component';
import { OrderLoaderComponent } from './order-loader/order-loader.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromOrders from './+state/orders.reducer';
import { OrdersEffects } from './+state/orders.effects';

@NgModule({
  imports: [
    CommonModule,

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

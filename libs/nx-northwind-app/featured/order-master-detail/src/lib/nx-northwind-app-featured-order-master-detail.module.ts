import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NxMaterialUiModule } from '@nx-northwind/nx-material-ui';
import { NxNorthwindAppFeaturedSharedModule } from '@nx-northwind/nx-northwind-app/featured/shared';
import { OrdersEffects } from './+state/orders-master-detail.effects';
import * as fromOrdersMasterDetail from './+state/orders-master-detail.reducer';
import { nxNorthwindAppFeaturedOrderMasterDetailRoutes } from './lib.routes';
import { OrderMasterDetailBrowserComponent } from './order-master-detail-browser/order-master-detail-browser.component';
import { OrderMasterDetailLoaderComponent } from './order-master-detail-loader/order-master-detail-loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NxNorthwindAppFeaturedSharedModule,
    NxMaterialUiModule,
    RouterModule.forChild(
      nxNorthwindAppFeaturedOrderMasterDetailRoutes
    ),

    StoreModule.forFeature(
      fromOrdersMasterDetail.ORDERS_MASTER_DETAIL_FEATURE_KEY,
      fromOrdersMasterDetail.ordersMasterDetailReducer
    ),

    EffectsModule.forFeature([OrdersEffects])
  ],
  declarations: [
    OrderMasterDetailBrowserComponent,
    OrderMasterDetailLoaderComponent
  ]
})
export class NxNorthwindAppFeaturedOrderMasterDetailModule {}

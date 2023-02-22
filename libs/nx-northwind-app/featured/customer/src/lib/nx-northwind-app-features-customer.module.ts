import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NxMaterialUiModule } from '@nx-northwind/nx-material-ui';
import { NxNorthwindAppFeaturedSharedModule } from '@nx-northwind/nx-northwind-app/featured/shared';
import { CustomersEffects } from './+state/customers.effects';
import * as fromCustomers from './+state/customers.reducer';
import { CustomerBrowserComponent } from './customer-browser/customer-browser.component';
import { CustomerLoaderComponent } from './customer-loader/customer-loader.component';
import { nxNorthwindAppFeaturesCustomerRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NxNorthwindAppFeaturedSharedModule,
    NxMaterialUiModule,
    RouterModule.forChild(nxNorthwindAppFeaturesCustomerRoutes),

    StoreModule.forFeature(
      fromCustomers.CUSTOMERS_FEATURE_KEY,
      fromCustomers.customersReducer
    ),

    EffectsModule.forFeature([CustomersEffects])
  ],
  declarations: [CustomerBrowserComponent, CustomerLoaderComponent],
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
export class NxNorthwindAppFeaturesCustomerModule {}

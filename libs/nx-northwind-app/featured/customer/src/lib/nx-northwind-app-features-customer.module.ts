import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { nxNorthwindAppFeaturesCustomerRoutes } from './lib.routes';
import { CustomerBrowserComponent } from './customer-browser/customer-browser.component';
import { CustomerLoaderComponent } from './customer-loader/customer-loader.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCustomers from './+state/customers.reducer';
import { CustomersEffects } from './+state/customers.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(nxNorthwindAppFeaturesCustomerRoutes),

    StoreModule.forFeature(
      fromCustomers.CUSTOMERS_FEATURE_KEY,
      fromCustomers.customersReducer
    ),

    EffectsModule.forFeature([CustomersEffects])
  ],
  declarations: [CustomerBrowserComponent, CustomerLoaderComponent]
})
export class NxNorthwindAppFeaturesCustomerModule {}

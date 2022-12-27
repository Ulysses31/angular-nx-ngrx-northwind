import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { nxNorthwindAppFeaturesCustomerRoutes } from './lib.routes';
import { CustomerBrowserComponent } from './customer-browser/customer-browser.component';
import { CustomerLoaderComponent } from './customer-loader/customer-loader.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(nxNorthwindAppFeaturesCustomerRoutes)
  ],
  declarations: [CustomerBrowserComponent, CustomerLoaderComponent]
})
export class NxNorthwindAppFeaturesCustomerModule {}

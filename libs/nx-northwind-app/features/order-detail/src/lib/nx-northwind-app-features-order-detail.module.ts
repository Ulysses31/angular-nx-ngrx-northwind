import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { nxNorthwindAppFeaturesOrderDetailRoutes } from './lib.routes';
import { OrderDetailLoaderComponent } from './order-detail-loader/order-detail-loader.component';
import { OrderDetailBrowserComponent } from './order-detail-browser/order-detail-browser.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(nxNorthwindAppFeaturesOrderDetailRoutes)
  ],
  declarations: [
    OrderDetailLoaderComponent,
    OrderDetailBrowserComponent
  ]
})
export class NxNorthwindAppFeaturesOrderDetailModule {}

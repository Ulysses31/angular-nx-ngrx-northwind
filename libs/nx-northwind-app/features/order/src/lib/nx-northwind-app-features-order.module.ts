import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { nxNorthwindAppFeaturesOrderRoutes } from './lib.routes';
import { OrderBrowserComponent } from './order-browser/order-browser.component';
import { OrderLoaderComponent } from './order-loader/order-loader.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(nxNorthwindAppFeaturesOrderRoutes)
  ],
  declarations: [OrderBrowserComponent, OrderLoaderComponent]
})
export class NxNorthwindAppFeaturesOrderModule {}

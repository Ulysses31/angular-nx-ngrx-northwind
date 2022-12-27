import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { nxNorthwindAppFeaturesShipperRoutes } from './lib.routes';
import { ShipperBrowserComponent } from './shipper-browser/shipper-browser.component';
import { ShipperLoaderComponent } from './shipper-loader/shipper-loader.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(nxNorthwindAppFeaturesShipperRoutes)
  ],
  declarations: [ShipperBrowserComponent, ShipperLoaderComponent]
})
export class NxNorthwindAppFeaturesShipperModule {}

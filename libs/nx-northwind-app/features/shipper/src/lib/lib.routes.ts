import { Route } from '@angular/router';
import { ShipperBrowserComponent } from './shipper-browser/shipper-browser.component';
import { ShipperLoaderComponent } from './shipper-loader/shipper-loader.component';

export const nxNorthwindAppFeaturesShipperRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  {
    path: '',
    pathMatch: 'full',
    component: ShipperBrowserComponent
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: ShipperLoaderComponent
  }
];

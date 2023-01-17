import { Route } from '@angular/router';
import { OrderDetailBrowserComponent } from './order-detail-browser/order-detail-browser.component';
import { OrderDetailLoaderComponent } from './order-detail-loader/order-detail-loader.component';

export const nxNorthwindAppFeaturesOrderDetailRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  {
    path: '',
    pathMatch: 'full',
    component: OrderDetailBrowserComponent
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: OrderDetailLoaderComponent
  }
];

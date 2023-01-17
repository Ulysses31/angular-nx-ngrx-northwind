import { Route } from '@angular/router';
import { OrderBrowserComponent } from './order-browser/order-browser.component';
import { OrderLoaderComponent } from './order-loader/order-loader.component';

export const nxNorthwindAppFeaturesOrderRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  {
    path: '',
    pathMatch: 'full',
    component: OrderBrowserComponent
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: OrderLoaderComponent
  }
];

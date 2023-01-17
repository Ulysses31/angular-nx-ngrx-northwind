import { Route } from '@angular/router';
import { CustomerBrowserComponent } from './customer-browser/customer-browser.component';
import { CustomerLoaderComponent } from './customer-loader/customer-loader.component';

export const nxNorthwindAppFeaturesCustomerRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  {
    path: '',
    pathMatch: 'full',
    component: CustomerBrowserComponent
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: CustomerLoaderComponent
  }
];

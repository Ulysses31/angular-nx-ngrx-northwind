import { Route } from '@angular/router';
import { SupplierBrowserComponent } from './supplier-browser/supplier-browser.component';
import { SupplierLoaderComponent } from './supplier-loader/supplier-loader.component';

export const nxNorthwindAppFeaturesSupplierRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  {
    path: '',
    pathMatch: 'full',
    component: SupplierBrowserComponent
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: SupplierLoaderComponent
  }
];

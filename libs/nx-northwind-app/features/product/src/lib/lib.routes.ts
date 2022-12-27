import { Route } from '@angular/router';
import { ProductBrowserComponent } from './product-browser/product-browser.component';
import { ProductLoaderComponent } from './product-loader/product-loader.component';

export const nxNorthwindAppFeaturesProductRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  {
    path: '',
    pathMatch: 'full',
    component: ProductBrowserComponent
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: ProductLoaderComponent
  }
];

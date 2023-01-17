import { Route } from '@angular/router';
import { CategoryBrowserComponent } from './category-browser/category-browser.component';
import { CategoryLoaderComponent } from './category-loader/category-loader.component';

export const nxNorthwindAppFeaturesCategoryRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  {
    path: '',
    pathMatch: 'full',
    component: CategoryBrowserComponent
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: CategoryLoaderComponent
  }
];

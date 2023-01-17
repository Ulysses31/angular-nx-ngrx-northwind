import { Route } from '@angular/router';
import { UserBrowserComponent } from './user-browser/user-browser.component';
import { UserLoaderComponent } from './user-loader/user-loader.component';

export const nxNorthwindAppFeaturesUserRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  {
    path: '',
    pathMatch: 'full',
    component: UserBrowserComponent
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: UserLoaderComponent
  }
];

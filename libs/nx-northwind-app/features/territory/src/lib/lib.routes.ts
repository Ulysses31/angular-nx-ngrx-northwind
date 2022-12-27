import { Route } from '@angular/router';
import { TerritoryBrowserComponent } from './territory-browser/territory-browser.component';
import { TerritoryLoaderComponent } from './territory-loader/territory-loader.component';

export const nxNorthwindAppFeaturesTerritoryRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  {
    path: '',
    pathMatch: 'full',
    component: TerritoryBrowserComponent
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: TerritoryLoaderComponent
  }
];

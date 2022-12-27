import { Route } from '@angular/router';
import { RegionBrowserComponent } from './region-browser/region-browser.component';
import { RegionLoaderComponent } from './region-loader/region-loader.component';

export const nxNorthwindAppFeaturesRegionRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  {
    path: '',
    pathMatch: 'full',
    component: RegionBrowserComponent
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: RegionLoaderComponent
  }
];

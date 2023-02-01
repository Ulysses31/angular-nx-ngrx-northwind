import { Route } from '@angular/router';
import { DashboardBrowserComponent } from './dashboard-browser/dashboard-browser.component';

export const nxNorthwindAppFeaturedDashboardRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  {
    path: '',
    pathMatch: 'full',
    component: DashboardBrowserComponent
  }
];

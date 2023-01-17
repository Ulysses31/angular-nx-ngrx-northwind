import { Route } from '@angular/router';
import { EmployeeTerritoryBrowserComponent } from './employee-territory-browser/employee-territory-browser.component';
import { EmployeeTerritoryLoaderComponent } from './employee-territory-loader/employee-territory-loader.component';

export const nxNorthwindAppFeaturesEmployeeTerritoryRoutes: Route[] =
  [
    /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    {
      path: '',
      pathMatch: 'full',
      component: EmployeeTerritoryBrowserComponent
    },
    {
      path: ':id',
      pathMatch: 'full',
      component: EmployeeTerritoryLoaderComponent
    }
  ];

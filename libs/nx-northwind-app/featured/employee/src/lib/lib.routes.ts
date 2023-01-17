import { Route } from '@angular/router';
import { EmployeeBrowserComponent } from './employee-browser/employee-browser.component';
import { EmployeeLoaderComponent } from './employee-loader/employee-loader.component';

export const nxNorthwindAppFeaturesEmployeeRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  {
    path: '',
    pathMatch: 'full',
    component: EmployeeBrowserComponent
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: EmployeeLoaderComponent
  }
];

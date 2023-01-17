import { Route } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

export const nxNorthwindAppFeaturesNotFoundRoutes: Route[] = [
  /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
  {
    path: '',
    pathMatch: 'full',
    component: NotFoundComponent
  }
];

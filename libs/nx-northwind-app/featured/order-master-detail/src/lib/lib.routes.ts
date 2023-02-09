import { Route } from '@angular/router';
import { OrderMasterDetailBrowserComponent } from './order-master-detail-browser/order-master-detail-browser.component';
import { OrderMasterDetailLoaderComponent } from './order-master-detail-loader/order-master-detail-loader.component';

export const nxNorthwindAppFeaturedOrderMasterDetailRoutes: Route[] =
  [
    /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    {
      path: '',
      pathMatch: 'full',
      component: OrderMasterDetailBrowserComponent
    },
    {
      path: ':id',
      pathMatch: 'full',
      component: OrderMasterDetailLoaderComponent
    }
  ];

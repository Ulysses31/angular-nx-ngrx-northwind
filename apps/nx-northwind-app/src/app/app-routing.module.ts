import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(
        '@nx-northwind/nx-northwind-app/featured/dashboard'
      ).then((m) => m.NxNorthwindAppFeaturedDashboardModule)
  },
  {
    path: 'category',
    loadChildren: () =>
      import('@nx-northwind/nx-northwind-app/featured/category').then(
        (m) => m.NxNorthwindAppFeaturesCategoryModule
      )
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('@nx-northwind/nx-northwind-app/featured/customer').then(
        (m) => m.NxNorthwindAppFeaturesCustomerModule
      )
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('@nx-northwind/nx-northwind-app/featured/employee').then(
        (m) => m.NxNorthwindAppFeaturesEmployeeModule
      )
  },
  {
    path: 'employee-territory',
    loadChildren: () =>
      import(
        '@nx-northwind/nx-northwind-app/featured/employee-territory'
      ).then((m) => m.NxNorthwindAppFeaturesEmployeeTerritoryModule)
  },
  {
    path: 'order',
    loadChildren: () =>
      import('@nx-northwind/nx-northwind-app/featured/order').then(
        (m) => m.NxNorthwindAppFeaturesOrderModule
      )
  },
  {
    path: 'order-detail',
    loadChildren: () =>
      import(
        '@nx-northwind/nx-northwind-app/featured/order-detail'
      ).then((m) => m.NxNorthwindAppFeaturesOrderDetailModule)
  },
  {
    path: 'order-master-detail',
    loadChildren: () =>
      import(
        '@nx-northwind/nx-northwind-app/featured/order-master-detail'
      ).then((m) => m.NxNorthwindAppFeaturedOrderMasterDetailModule)
  },
  {
    path: 'product',
    loadChildren: () =>
      import('@nx-northwind/nx-northwind-app/featured/product').then(
        (m) => m.NxNorthwindAppFeaturesProductModule
      )
  },
  {
    path: 'region',
    loadChildren: () =>
      import('@nx-northwind/nx-northwind-app/featured/region').then(
        (m) => m.NxNorthwindAppFeaturesRegionModule
      )
  },
  {
    path: 'shipper',
    loadChildren: () =>
      import('@nx-northwind/nx-northwind-app/featured/shipper').then(
        (m) => m.NxNorthwindAppFeaturesShipperModule
      )
  },
  {
    path: 'supplier',
    loadChildren: () =>
      import('@nx-northwind/nx-northwind-app/featured/supplier').then(
        (m) => m.NxNorthwindAppFeaturesSupplierModule
      )
  },
  {
    path: 'territory',
    loadChildren: () =>
      import(
        '@nx-northwind/nx-northwind-app/featured/territory'
      ).then((m) => m.NxNorthwindAppFeaturesTerritoryModule)
  },
  {
    path: 'user',
    loadChildren: () =>
      import('@nx-northwind/nx-northwind-app/featured/user').then(
        (m) => m.NxNorthwindAppFeaturesUserModule
      )
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import(
        '@nx-northwind/nx-northwind-app/featured/not-found'
      ).then((m) => m.NxNorthwindAppFeaturesNotFoundModule)
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledNonBlocking'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

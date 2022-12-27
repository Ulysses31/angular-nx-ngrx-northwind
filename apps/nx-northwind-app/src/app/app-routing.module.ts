import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'category',
    loadChildren: () =>
      import('@nx-northwind/nx-northwind-app/features/category').then(
        (m) => m.NxNorthwindAppFeaturesCategoryModule
      )
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('@nx-northwind/nx-northwind-app/features/customer').then(
        (m) => m.NxNorthwindAppFeaturesCustomerModule
      )
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('@nx-northwind/nx-northwind-app/features/employee').then(
        (m) => m.NxNorthwindAppFeaturesEmployeeModule
      )
  },
  {
    path: 'employee-territory',
    loadChildren: () =>
      import(
        '@nx-northwind/nx-northwind-app/features/employee-territory'
      ).then((m) => m.NxNorthwindAppFeaturesEmployeeTerritoryModule)
  },
  {
    path: 'order',
    loadChildren: () =>
      import('@nx-northwind/nx-northwind-app/features/order').then(
        (m) => m.NxNorthwindAppFeaturesOrderModule
      )
  },
  {
    path: 'order-detail',
    loadChildren: () =>
      import(
        '@nx-northwind/nx-northwind-app/features/order-detail'
      ).then((m) => m.NxNorthwindAppFeaturesOrderDetailModule)
  },
  {
    path: 'product',
    loadChildren: () =>
      import('@nx-northwind/nx-northwind-app/features/product').then(
        (m) => m.NxNorthwindAppFeaturesProductModule
      )
  },
  {
    path: 'region',
    loadChildren: () =>
      import('@nx-northwind/nx-northwind-app/features/region').then(
        (m) => m.NxNorthwindAppFeaturesRegionModule
      )
  },
  {
    path: 'shipper',
    loadChildren: () =>
      import('@nx-northwind/nx-northwind-app/features/shipper').then(
        (m) => m.NxNorthwindAppFeaturesShipperModule
      )
  },
  {
    path: 'supplier',
    loadChildren: () =>
      import('@nx-northwind/nx-northwind-app/features/supplier').then(
        (m) => m.NxNorthwindAppFeaturesSupplierModule
      )
  },
  {
    path: 'territory',
    loadChildren: () =>
      import(
        '@nx-northwind/nx-northwind-app/features/territory'
      ).then((m) => m.NxNorthwindAppFeaturesTerritoryModule)
  },
  {
    path: 'user',
    loadChildren: () =>
      import('@nx-northwind/nx-northwind-app/features/user').then(
        (m) => m.NxNorthwindAppFeaturesUserModule
      )
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import(
        '@nx-northwind/nx-northwind-app/features/not-found'
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { nxNorthwindAppFeaturesSupplierRoutes } from './lib.routes';
import { SupplierLoaderComponent } from './supplier-loader/supplier-loader.component';
import { SupplierBrowserComponent } from './supplier-browser/supplier-browser.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(nxNorthwindAppFeaturesSupplierRoutes)
  ],
  declarations: [SupplierLoaderComponent, SupplierBrowserComponent]
})
export class NxNorthwindAppFeaturesSupplierModule {}

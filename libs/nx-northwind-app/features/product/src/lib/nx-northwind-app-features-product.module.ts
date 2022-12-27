import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { nxNorthwindAppFeaturesProductRoutes } from './lib.routes';
import { ProductBrowserComponent } from './product-browser/product-browser.component';
import { ProductLoaderComponent } from './product-loader/product-loader.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(nxNorthwindAppFeaturesProductRoutes)
  ],
  declarations: [ProductBrowserComponent, ProductLoaderComponent]
})
export class NxNorthwindAppFeaturesProductModule {}

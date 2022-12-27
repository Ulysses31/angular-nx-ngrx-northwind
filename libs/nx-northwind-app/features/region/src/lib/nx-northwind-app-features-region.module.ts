import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { nxNorthwindAppFeaturesRegionRoutes } from './lib.routes';
import { RegionLoaderComponent } from './region-loader/region-loader.component';
import { RegionBrowserComponent } from './region-browser/region-browser.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(nxNorthwindAppFeaturesRegionRoutes)
  ],
  declarations: [RegionLoaderComponent, RegionBrowserComponent]
})
export class NxNorthwindAppFeaturesRegionModule {}

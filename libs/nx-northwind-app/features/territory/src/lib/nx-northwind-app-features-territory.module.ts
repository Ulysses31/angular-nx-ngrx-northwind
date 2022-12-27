import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { nxNorthwindAppFeaturesTerritoryRoutes } from './lib.routes';
import { TerritoryBrowserComponent } from './territory-browser/territory-browser.component';
import { TerritoryLoaderComponent } from './territory-loader/territory-loader.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(nxNorthwindAppFeaturesTerritoryRoutes)
  ],
  declarations: [TerritoryBrowserComponent, TerritoryLoaderComponent]
})
export class NxNorthwindAppFeaturesTerritoryModule {}

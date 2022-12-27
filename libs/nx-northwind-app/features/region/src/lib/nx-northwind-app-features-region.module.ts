import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { nxNorthwindAppFeaturesRegionRoutes } from './lib.routes';
import { RegionLoaderComponent } from './region-loader/region-loader.component';
import { RegionBrowserComponent } from './region-browser/region-browser.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromRegions from './+state/regions.reducer';
import { RegionsEffects } from './+state/regions.effects';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(nxNorthwindAppFeaturesRegionRoutes),

    StoreModule.forFeature(
      fromRegions.REGIONS_FEATURE_KEY,
      fromRegions.regionsReducer
    ),

    EffectsModule.forFeature([RegionsEffects])
  ],
  declarations: [RegionLoaderComponent, RegionBrowserComponent]
})
export class NxNorthwindAppFeaturesRegionModule {}

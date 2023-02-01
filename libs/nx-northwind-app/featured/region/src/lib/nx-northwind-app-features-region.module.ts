import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NxMaterialUiModule } from '@nx-northwind/nx-material-ui';
import { NxNorthwindAppFeaturedSharedModule } from '@nx-northwind/nx-northwind-app/featured/shared';
import { RegionsEffects } from './+state/regions.effects';
import * as fromRegions from './+state/regions.reducer';
import { nxNorthwindAppFeaturesRegionRoutes } from './lib.routes';
import { RegionBrowserComponent } from './region-browser/region-browser.component';
import { RegionLoaderComponent } from './region-loader/region-loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NxNorthwindAppFeaturedSharedModule,
    NxMaterialUiModule,
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

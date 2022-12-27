import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { nxNorthwindAppFeaturesTerritoryRoutes } from './lib.routes';
import { TerritoryBrowserComponent } from './territory-browser/territory-browser.component';
import { TerritoryLoaderComponent } from './territory-loader/territory-loader.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTerritories from './+state/territories.reducer';
import { TerritoriesEffects } from './+state/territories.effects';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(nxNorthwindAppFeaturesTerritoryRoutes),

    StoreModule.forFeature(
      fromTerritories.TERRITORIES_FEATURE_KEY,
      fromTerritories.territoriesReducer
    ),

    EffectsModule.forFeature([TerritoriesEffects])
  ],
  declarations: [TerritoryBrowserComponent, TerritoryLoaderComponent]
})
export class NxNorthwindAppFeaturesTerritoryModule {}

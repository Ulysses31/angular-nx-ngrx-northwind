import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NxMaterialUiModule } from '@nx-northwind/nx-material-ui';
import { NxNorthwindAppFeaturedSharedModule } from '@nx-northwind/nx-northwind-app/featured/shared';
import { TerritoriesEffects } from './+state/territories.effects';
import * as fromTerritories from './+state/territories.reducer';
import { nxNorthwindAppFeaturesTerritoryRoutes } from './lib.routes';
import { TerritoryBrowserComponent } from './territory-browser/territory-browser.component';
import { TerritoryLoaderComponent } from './territory-loader/territory-loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NxNorthwindAppFeaturedSharedModule,
    NxMaterialUiModule,
    RouterModule.forChild(nxNorthwindAppFeaturesTerritoryRoutes),

    StoreModule.forFeature(
      fromTerritories.TERRITORIES_FEATURE_KEY,
      fromTerritories.territoriesReducer
    ),

    EffectsModule.forFeature([TerritoriesEffects])
  ],
  declarations: [TerritoryBrowserComponent, TerritoryLoaderComponent],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    }
  ]
})
export class NxNorthwindAppFeaturesTerritoryModule {}

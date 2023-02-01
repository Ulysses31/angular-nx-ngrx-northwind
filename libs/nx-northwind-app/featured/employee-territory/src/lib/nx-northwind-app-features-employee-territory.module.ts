import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NxMaterialUiModule } from '@nx-northwind/nx-material-ui';
import { NxNorthwindAppFeaturedSharedModule } from '@nx-northwind/nx-northwind-app/featured/shared';
import { EmployeeTerritoriesEffects } from './+state/employee-territories.effects';
import * as fromEmployeeTerritories from './+state/employee-territories.reducer';
import { EmployeeTerritoryBrowserComponent } from './employee-territory-browser/employee-territory-browser.component';
import { EmployeeTerritoryLoaderComponent } from './employee-territory-loader/employee-territory-loader.component';
import { nxNorthwindAppFeaturesEmployeeTerritoryRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NxNorthwindAppFeaturedSharedModule,
    NxMaterialUiModule,
    RouterModule.forChild(
      nxNorthwindAppFeaturesEmployeeTerritoryRoutes
    ),

    StoreModule.forFeature(
      fromEmployeeTerritories.EMPLOYEE_TERRITORIES_FEATURE_KEY,
      fromEmployeeTerritories.employeeTerritoriesReducer
    ),

    EffectsModule.forFeature([EmployeeTerritoriesEffects])
  ],
  declarations: [
    EmployeeTerritoryBrowserComponent,
    EmployeeTerritoryLoaderComponent
  ]
})
export class NxNorthwindAppFeaturesEmployeeTerritoryModule {}

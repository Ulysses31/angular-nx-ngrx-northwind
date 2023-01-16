import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { nxNorthwindAppFeaturesEmployeeTerritoryRoutes } from './lib.routes';
import { EmployeeTerritoryBrowserComponent } from './employee-territory-browser/employee-territory-browser.component';
import { EmployeeTerritoryLoaderComponent } from './employee-territory-loader/employee-territory-loader.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromEmployeeTerritories from './+state/employee-territories.reducer';
import { EmployeeTerritoriesEffects } from './+state/employee-territories.effects';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(
      nxNorthwindAppFeaturesEmployeeTerritoryRoutes
    ),

    StoreModule.forFeature(
      fromEmployeeTerritories.EMPLOYEE_TERRITORIES_FEATURE_KEY,
      fromEmployeeTerritories.employeesTerritoriesReducer
    ),

    EffectsModule.forFeature([EmployeeTerritoriesEffects])
  ],
  declarations: [
    EmployeeTerritoryBrowserComponent,
    EmployeeTerritoryLoaderComponent
  ]
})
export class NxNorthwindAppFeaturesEmployeeTerritoryModule {}

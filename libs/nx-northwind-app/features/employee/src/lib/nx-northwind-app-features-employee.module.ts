import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { nxNorthwindAppFeaturesEmployeeRoutes } from './lib.routes';
import { EmployeeLoaderComponent } from './employee-loader/employee-loader.component';
import { EmployeeBrowserComponent } from './employee-browser/employee-browser.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromEmployees from './+state/employees.reducer';
import { EmployeesEffects } from './+state/employees.effects';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(nxNorthwindAppFeaturesEmployeeRoutes),

    StoreModule.forFeature(
      fromEmployees.EMPLOYEES_FEATURE_KEY,
      fromEmployees.employeesReducer
    ),

    EffectsModule.forFeature([EmployeesEffects])
  ],
  declarations: [EmployeeLoaderComponent, EmployeeBrowserComponent]
})
export class NxNorthwindAppFeaturesEmployeeModule {}

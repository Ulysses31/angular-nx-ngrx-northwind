import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NxMaterialUiModule } from '@nx-northwind/nx-material-ui';
import { NxNorthwindAppFeaturedSharedModule } from '@nx-northwind/nx-northwind-app/featured/shared';
import { EmployeesEffects } from './+state/employees.effects';
import * as fromEmployees from './+state/employees.reducer';
import { EmployeeBrowserComponent } from './employee-browser/employee-browser.component';
import { EmployeeLoaderComponent } from './employee-loader/employee-loader.component';
import { nxNorthwindAppFeaturesEmployeeRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NxNorthwindAppFeaturedSharedModule,
    NxMaterialUiModule,
    RouterModule.forChild(nxNorthwindAppFeaturesEmployeeRoutes),

    StoreModule.forFeature(
      fromEmployees.EMPLOYEES_FEATURE_KEY,
      fromEmployees.employeesReducer
    ),

    EffectsModule.forFeature([EmployeesEffects])
  ],
  declarations: [EmployeeLoaderComponent, EmployeeBrowserComponent],
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
export class NxNorthwindAppFeaturesEmployeeModule {}

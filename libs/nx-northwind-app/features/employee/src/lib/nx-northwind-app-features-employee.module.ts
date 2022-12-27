import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { nxNorthwindAppFeaturesEmployeeRoutes } from './lib.routes';
import { EmployeeLoaderComponent } from './employee-loader/employee-loader.component';
import { EmployeeBrowserComponent } from './employee-browser/employee-browser.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(nxNorthwindAppFeaturesEmployeeRoutes)
  ],
  declarations: [EmployeeLoaderComponent, EmployeeBrowserComponent]
})
export class NxNorthwindAppFeaturesEmployeeModule {}

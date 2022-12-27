import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { nxNorthwindAppFeaturesEmployeeTerritoryRoutes } from './lib.routes';
import { EmployeeTerritoryBrowserComponent } from './employee-territory-browser/employee-territory-browser.component';
import { EmployeeTerritoryLoaderComponent } from './employee-territory-loader/employee-territory-loader.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(
      nxNorthwindAppFeaturesEmployeeTerritoryRoutes
    )
  ],
  declarations: [
    EmployeeTerritoryBrowserComponent,
    EmployeeTerritoryLoaderComponent
  ]
})
export class NxNorthwindAppFeaturesEmployeeTerritoryModule {}

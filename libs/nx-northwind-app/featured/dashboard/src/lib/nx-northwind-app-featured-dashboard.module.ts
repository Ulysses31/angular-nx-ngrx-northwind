import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NxMaterialUiModule } from '@nx-northwind/nx-material-ui';
import { NxNorthwindAppFeaturedSharedModule } from '@nx-northwind/nx-northwind-app/featured/shared';
import { DashboardBrowserComponent } from './dashboard-browser/dashboard-browser.component';
import { nxNorthwindAppFeaturedDashboardRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NxNorthwindAppFeaturedSharedModule,
    NxMaterialUiModule,
    RouterModule.forChild(nxNorthwindAppFeaturedDashboardRoutes)
  ],
  declarations: [DashboardBrowserComponent]
})
export class NxNorthwindAppFeaturedDashboardModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { nxNorthwindAppFeaturesUserRoutes } from './lib.routes';
import { UserLoaderComponent } from './user-loader/user-loader.component';
import { UserBrowserComponent } from './user-browser/user-browser.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(nxNorthwindAppFeaturesUserRoutes)
  ],
  declarations: [UserLoaderComponent, UserBrowserComponent]
})
export class NxNorthwindAppFeaturesUserModule {}

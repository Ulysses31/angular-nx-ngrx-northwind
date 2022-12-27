import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { nxNorthwindAppFeaturesNotFoundRoutes } from './lib.routes';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(nxNorthwindAppFeaturesNotFoundRoutes)
  ],
  declarations: [NotFoundComponent]
})
export class NxNorthwindAppFeaturesNotFoundModule {}

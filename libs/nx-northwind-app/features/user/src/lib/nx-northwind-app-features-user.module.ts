import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { nxNorthwindAppFeaturesUserRoutes } from './lib.routes';
import { UserLoaderComponent } from './user-loader/user-loader.component';
import { UserBrowserComponent } from './user-browser/user-browser.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUsers from './+state/users.reducer';
import { UsersEffects } from './+state/users.effects';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(nxNorthwindAppFeaturesUserRoutes),

    StoreModule.forFeature(
      fromUsers.USERS_FEATURE_KEY,
      fromUsers.usersReducer
    ),

    EffectsModule.forFeature([UsersEffects])
  ],
  declarations: [UserLoaderComponent, UserBrowserComponent]
})
export class NxNorthwindAppFeaturesUserModule {}

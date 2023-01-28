import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { nxNorthwindAppFeaturesCategoryRoutes } from './lib.routes';
import { CategoryBrowserComponent } from './category-browser/category-browser.component';
import { CategoryLoaderComponent } from './category-loader/category-loader.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCategories from './+state/categories.reducer';
import { CategoriesEffects } from './+state/categories.effects';
import { NxNorthwindAppFeaturedSharedModule } from '@nx-northwind/nx-northwind-app/featured/shared';
import { FormsModule } from '@angular/forms';
import { NxMaterialUiModule } from '@nx-northwind/nx-material-ui';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NxNorthwindAppFeaturedSharedModule,
    NxMaterialUiModule,
    RouterModule.forChild(nxNorthwindAppFeaturesCategoryRoutes),

    StoreModule.forFeature(
      fromCategories.CATEGORIES_FEATURE_KEY,
      fromCategories.categoriesReducer
    ),

    EffectsModule.forFeature([CategoriesEffects])
  ],
  declarations: [CategoryBrowserComponent, CategoryLoaderComponent]
})
export class NxNorthwindAppFeaturesCategoryModule {}

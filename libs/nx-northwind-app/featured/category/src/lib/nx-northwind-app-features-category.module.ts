import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NxMaterialUiModule } from '@nx-northwind/nx-material-ui';
import { NxNorthwindAppFeaturedSharedModule } from '@nx-northwind/nx-northwind-app/featured/shared';
import { CategoriesEffects } from './+state/categories.effects';
import * as fromCategories from './+state/categories.reducer';
import {
  CategoryBrowserComponent,
  CategoryBrowserDialogComponent
} from './category-browser/category-browser.component';
import { CategoryLoaderComponent } from './category-loader/category-loader.component';
import { nxNorthwindAppFeaturesCategoryRoutes } from './lib.routes';

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
  declarations: [
    CategoryBrowserComponent,
    CategoryLoaderComponent,
    CategoryBrowserDialogComponent
  ]
})
export class NxNorthwindAppFeaturesCategoryModule {}

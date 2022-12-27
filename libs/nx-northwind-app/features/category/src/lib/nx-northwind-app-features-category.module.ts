import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { nxNorthwindAppFeaturesCategoryRoutes } from './lib.routes';
import { CategoryBrowserComponent } from './category-browser/category-browser.component';
import { CategoryLoaderComponent } from './category-loader/category-loader.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(nxNorthwindAppFeaturesCategoryRoutes)
  ],
  declarations: [CategoryBrowserComponent, CategoryLoaderComponent]
})
export class NxNorthwindAppFeaturesCategoryModule {}

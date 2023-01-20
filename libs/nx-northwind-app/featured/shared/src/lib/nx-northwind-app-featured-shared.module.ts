import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseBrowserComponent } from './base-browser/base-browser.component';
import { BaseLoaderComponent } from './base-loader/base-loader.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [BaseBrowserComponent, BaseLoaderComponent],
  exports: [BaseBrowserComponent, BaseLoaderComponent]
})
export class NxNorthwindAppFeaturedSharedModule {}

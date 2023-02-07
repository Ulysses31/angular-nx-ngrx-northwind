import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseBrowserComponent } from './base-browser/base-browser.component';
import { BaseLoaderComponent } from './base-loader/base-loader.component';
import { FormsModule } from '@angular/forms';
import { NxMaterialUiModule } from '@nx-northwind/nx-material-ui';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';

const CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
  imports: [CommonModule, FormsModule, NxMaterialUiModule],
  declarations: [
    CanvasJSChart,
    BaseBrowserComponent,
    BaseLoaderComponent
  ],
  exports: [CanvasJSChart, BaseBrowserComponent, BaseLoaderComponent]
})
export class NxNorthwindAppFeaturedSharedModule {}

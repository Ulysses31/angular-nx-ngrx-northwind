import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxMaterialUiModule } from '@nx-northwind/nx-material-ui';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import { BaseBrowserComponent } from './base-browser/base-browser.component';
import { BaseLoaderComponent } from './base-loader/base-loader.component';
import { BaseMasterDetailBrowserComponent } from './base-master-detail-browser/base-master-detail-browser.component';
import { BaseMasterDetailLoaderComponent } from './base-master-detail-loader/base-master-detail-loader.component';

const CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
  imports: [CommonModule, FormsModule, NxMaterialUiModule],
  declarations: [
    CanvasJSChart,
    BaseBrowserComponent,
    BaseLoaderComponent,
    BaseMasterDetailBrowserComponent,
    BaseMasterDetailLoaderComponent
  ],
  exports: [
    CanvasJSChart,
    BaseBrowserComponent,
    BaseLoaderComponent,
    BaseMasterDetailBrowserComponent,
    BaseMasterDetailLoaderComponent
  ]
})
export class NxNorthwindAppFeaturedSharedModule {}

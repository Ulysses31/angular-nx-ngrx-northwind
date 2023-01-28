import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MtButtonComponent } from './controls/mt-button/mt-button.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MtButtonFabComponent } from './controls/mt-button-fab/mt-button-fab.component';
import { MtButtonFlatComponent } from './controls/mt-button-flat/mt-button-flat.component';
import { MtButtonIconComponent } from './controls/mt-button-icon/mt-button-icon.component';
import { MtButtonMinifabComponent } from './controls/mt-button-minifab/mt-button-minifab.component';
import { MtButtonRaisedComponent } from './controls/mt-button-raised/mt-button-raised.component';
import { MtButtonStrokedComponent } from './controls/mt-button-stroked/mt-button-stroked.component';
import { MtButtonToggleComponent } from './controls/mt-button-toggle/mt-button-toggle.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MtCardComponent } from './controls/mt-card/mt-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MtCheckboxComponent } from './controls/mt-checkbox/mt-checkbox.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MtChipsComponent } from './controls/mt-chips/mt-chips.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MtExpansionPanelComponent } from './controls/mt-expansion-panel/mt-expansion-panel.component';
import { MtInputColorComponent } from './controls/mt-input-color/mt-input-color.component';
import { MtInputDateComponent } from './controls/mt-input-date/mt-input-date.component';
import { MtInputEmailComponent } from './controls/mt-input-email/mt-input-email.component';
import { MtInputNumberComponent } from './controls/mt-input-number/mt-input-number.component';
import { MtInputPasswordComponent } from './controls/mt-input-password/mt-input-password.component';
import { MtInputSearchComponent } from './controls/mt-input-search/mt-input-search.component';
import { MtInputTelComponent } from './controls/mt-input-tel/mt-input-tel.component';
import { MtInputTextComponent } from './controls/mt-input-text/mt-input-text.component';
import { MtInputTextareaComponent } from './controls/mt-input-textarea/mt-input-textarea.component';
import { MtInputTimeComponent } from './controls/mt-input-time/mt-input-time.component';
import { MtInputUrlComponent } from './controls/mt-input-url/mt-input-url.component';
import { MtLayoutComponent } from './controls/mt-layout/mt-layout.component';
import { MtListComponent } from './controls/mt-list/mt-list.component';
import { MtPaginatorComponent } from './controls/mt-paginator/mt-paginator.component';
import { MtProgressComponent } from './controls/mt-progress/mt-progress.component';
import { MtRadioComponent } from './controls/mt-radio/mt-radio.component';
import { MtSelectComponent } from './controls/mt-select/mt-select.component';
import { MtSidenavComponent } from './controls/mt-sidenav/mt-sidenav.component';
import { MtSlideComponent } from './controls/mt-slide/mt-slide.component';
import { MtSliderComponent } from './controls/mt-slider/mt-slider.component';
import { MtSpinnerComponent } from './controls/mt-spinner/mt-spinner.component';
import { MtTableComponent } from './controls/mt-table/mt-table.component';
import { MtToolbarComponent } from './controls/mt-toolbar/mt-toolbar.component';
import { MtTreeComponent } from './controls/mt-tree/mt-tree.component';
import { MtToolbarBtnfunctionsComponent } from './controls/mt-toolbar-btnfunctions/mt-toolbar-btnfunctions.component';
import { MtDrawerComponent } from './controls/mt-drawer/mt-drawer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatChipsModule,
    MatListModule,
    MatExpansionModule,
    MatTreeModule,
    CdkTreeModule,
    MatSelectModule,
    MatPaginatorModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTableModule,
    LayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatSortModule
  ],
  declarations: [
    MtButtonComponent,
    MtButtonFabComponent,
    MtButtonFlatComponent,
    MtButtonIconComponent,
    MtButtonMinifabComponent,
    MtButtonRaisedComponent,
    MtButtonStrokedComponent,
    MtButtonToggleComponent,
    MtCardComponent,
    MtCheckboxComponent,
    MtChipsComponent,
    MtExpansionPanelComponent,
    MtInputColorComponent,
    MtInputDateComponent,
    MtInputEmailComponent,
    MtInputNumberComponent,
    MtInputPasswordComponent,
    MtInputSearchComponent,
    MtInputTelComponent,
    MtInputTextComponent,
    MtInputTextareaComponent,
    MtInputTimeComponent,
    MtInputUrlComponent,
    MtLayoutComponent,
    MtListComponent,
    MtPaginatorComponent,
    MtProgressComponent,
    MtRadioComponent,
    MtSelectComponent,
    MtSidenavComponent,
    MtSlideComponent,
    MtSliderComponent,
    MtSpinnerComponent,
    MtTableComponent,
    MtToolbarComponent,
    MtTreeComponent,
    MtToolbarBtnfunctionsComponent,
    MtDrawerComponent
  ],
  exports: [
    MtButtonComponent,
    MtButtonFabComponent,
    MtButtonFlatComponent,
    MtButtonIconComponent,
    MtButtonMinifabComponent,
    MtButtonRaisedComponent,
    MtButtonStrokedComponent,
    MtButtonToggleComponent,
    MtCardComponent,
    MtCheckboxComponent,
    MtChipsComponent,
    MtExpansionPanelComponent,
    MtInputColorComponent,
    MtInputDateComponent,
    MtInputEmailComponent,
    MtInputNumberComponent,
    MtInputPasswordComponent,
    MtInputSearchComponent,
    MtInputTelComponent,
    MtInputTextComponent,
    MtInputTextareaComponent,
    MtInputTimeComponent,
    MtInputUrlComponent,
    MtLayoutComponent,
    MtListComponent,
    MtPaginatorComponent,
    MtProgressComponent,
    MtRadioComponent,
    MtSelectComponent,
    MtSidenavComponent,
    MtSlideComponent,
    MtSliderComponent,
    MtSpinnerComponent,
    MtTableComponent,
    MtToolbarComponent,
    MtTreeComponent,
    MtToolbarBtnfunctionsComponent,
    MtDrawerComponent
  ]
})
export class NxMaterialUiModule {}

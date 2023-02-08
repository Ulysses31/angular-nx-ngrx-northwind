/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MaterialColor, ProgrSpinnerMode } from '../enums/enums';

@Component({
  selector: 'nx-northwind-mt-spinner',
  template: `
    <mat-progress-spinner
      [color]="color"
      [mode]="mode"
      [value]="value"
      [diameter]="diameter"
      [strokeWidth]="strokeWidth">
    </mat-progress-spinner>
  `,
  styleUrls: ['./mt-spinner.component.scss']
})
export class MtSpinnerComponent implements OnInit {
  @Input() color: MaterialColor = MaterialColor.Basic;
  @Input() mode: ProgressSpinnerMode = ProgrSpinnerMode.Indeterminate
  @Input() value: number = 0;
  @Input() diameter: number = 0;
  @Input() strokeWidth: number = 0;

  constructor() {
    console.log('nx-northwind-mt-spinner constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-spinner OnInit...');
  }
}

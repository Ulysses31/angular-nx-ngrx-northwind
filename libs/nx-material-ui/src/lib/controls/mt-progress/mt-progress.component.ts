/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import { MaterialColor, ProgrBarMode } from '../enums/enums';

@Component({
  selector: 'nx-northwind-mt-progress',
  template: `
    <mat-progress-bar
      [color]="color"
      [mode]="mode"
      [value]="value"
      [bufferValue]="bufferValue">
    </mat-progress-bar>
  `,
  styleUrls: ['./mt-progress.component.scss']
})
export class MtProgressComponent implements OnInit {
  @Input() color: MaterialColor = MaterialColor.Basic;
  @Input() mode: ProgrBarMode = ProgrBarMode.Determinate;
  @Input() value: number = 0;
  @Input() bufferValue: number = 0;

  constructor() {
    console.log('nx-northwind-mt-progress constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-progress OnInit...');
  }
}

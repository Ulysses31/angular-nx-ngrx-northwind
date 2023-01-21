/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { MaterialColor } from '../enums/enums';

@Component({
  selector: 'nx-northwind-mt-button-stroked',
  template: ` <button
    mat-stroked-button
    [color]="color"
    [disabled]="disabled"
    [matTooltip]="toolTipMessage"
    [matTooltipPosition]="tipPosition"
    [matTooltipShowDelay]="1000"
    (click)="command()">
    <mat-icon>{{ icon }}</mat-icon> {{ label }}
  </button>`,
  styleUrls: ['./mt-button-stroked.component.scss']
})
export class MtButtonStrokedComponent implements OnInit {
  @Input() command?: any;
  @Input() label: string = 'Stroked';
  @Input() icon: string = '';
  @Input() disabled: boolean = false;
  @Input() color: MaterialColor = MaterialColor.Basic;
  @Input() toolTipMessage: string = '';
  tipPosition: TooltipPosition = 'above';

  constructor() {
    console.log('nx-northwind-mt-button-stroked constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-button-stroked OnInit...');
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { MaterialColor } from '../enums/enums';

@Component({
  selector: 'nx-northwind-mt-button-fab',
  template: `
    <button
      mat-fab
      [color]="color"
      [disabled]="disabled"
      [matTooltip]="toolTipMessage"
      [matTooltipPosition]="tipPosition"
      [matTooltipShowDelay]="1000"
      (click)="command()">
      <mat-icon>{{ icon }}</mat-icon>
    </button>
  `,
  styleUrls: ['./mt-button-fab.component.scss']
})
export class MtButtonFabComponent implements OnInit {
  @Input() command?: any;
  @Input() icon: string = 'home';
  @Input() disabled: boolean = false;
  @Input() color: MaterialColor = MaterialColor.Basic;
  @Input() toolTipMessage: string = '';
  tipPosition: TooltipPosition = 'above';

  constructor() {
    console.log('nx-northwind-mt-button-fab constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-button-fab OnInit...');
  }
}

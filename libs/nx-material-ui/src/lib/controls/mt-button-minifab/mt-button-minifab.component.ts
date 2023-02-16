/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { MaterialColor } from '../enums/enums';

@Component({
  selector: 'nx-northwind-mt-button-minifab',
  template: `
    <button
      mat-mini-fab
      type="button"
      [id]="id"
      [name]="name"
      [color]="color"
      [disabled]="disabled"
      [matTooltip]="toolTipMessage"
      [matTooltipPosition]="tipPosition"
      [matTooltipShowDelay]="1000"
      (click)="command(commandArgs)">
      <mat-icon class="minifab-icon" *ngIf="icon">{{ icon }}</mat-icon>
    </button>
  `,
  styleUrls: ['./mt-button-minifab.component.scss']
})
export class MtButtonMinifabComponent implements OnInit {
  @Input() command!: (args: any) => void;
  @Input() commandArgs: any;
  @Input() icon: string = 'home';
  @Input() disabled: boolean = false;
  @Input() color: MaterialColor = MaterialColor.Primary;
  @Input() toolTipMessage: string = '';
  @Input() id: string = '';
  @Input() name: string = '';
  tipPosition: TooltipPosition = 'above';

  constructor() {
    console.log('nx-northwind-mt-button-minifab constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-button-minifab OnInit...');
  }
}

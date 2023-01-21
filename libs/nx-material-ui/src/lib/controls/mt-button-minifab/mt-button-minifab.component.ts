/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import { MaterialColor } from '../enums/enums';

@Component({
  selector: 'nx-northwind-mt-button-minifab',
  template: `
    <button
      mat-mini-fab
      [color]="color"
      [disabled]="disabled"
      (click)="command()">
      <mat-icon>{{ icon }}</mat-icon>
    </button>
  `,
  styleUrls: ['./mt-button-minifab.component.scss']
})
export class MtButtonMinifabComponent implements OnInit {
  @Input() command?: any;
  @Input() icon: string = 'home';
  @Input() disabled: boolean = false;
  @Input() color: MaterialColor = MaterialColor.Basic;

  constructor() {
    console.log('nx-northwind-mt-button-minifab constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-button-minifab OnInit...');
  }
}

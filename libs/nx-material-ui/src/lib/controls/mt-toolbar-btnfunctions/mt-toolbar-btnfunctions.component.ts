/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import { MaterialColor } from '../enums/enums';

@Component({
  selector: 'nx-northwind-mt-toolbar-btnfunctions',
  template: `<mat-toolbar [color]="color" class="mat-elevation-z4">
    <span>{{ title }}</span>
    <span *ngIf="hasSpacer" class="example-spacer"></span>
    <ng-content></ng-content>
  </mat-toolbar> `,
  styleUrls: ['./mt-toolbar-btnfunctions.component.scss']
})
export class MtToolbarBtnfunctionsComponent implements OnInit {
  @Input() color: MaterialColor = MaterialColor.Primary;
  @Input() hasSpacer: boolean = true;
  @Input() title: string = '';

  constructor() {
    console.log(
      'nx-northwind-mt-toolbar-btn-functions constructor...'
    );
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-toolbar-btn-functions OnInit...');
  }
}

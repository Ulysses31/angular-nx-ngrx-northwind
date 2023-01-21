/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MaterialColor, SlideLabelPosition } from '../enums/enums';

@Component({
  selector: 'nx-northwind-mt-slide',
  template: `
    <mat-slide-toggle
      [disabled]="disabled"
      [color]="color"
      [checked]="checked"
      [labelPosition]="labelPosition">
      {{ label }}
    </mat-slide-toggle>
  `,
  styleUrls: ['./mt-slide.component.scss']
})
export class MtSlideComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() color: ThemePalette = MaterialColor.Primary;
  @Input() checked: boolean = false;
  @Input() label: string = 'Slide me!';
  @Input() labelPosition: SlideLabelPosition =
    SlideLabelPosition.After;

  constructor() {
    console.log('nx-northwind-mt-slide constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-slide OnInit...');
  }
}

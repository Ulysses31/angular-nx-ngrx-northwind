/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MaterialColor } from '../enums/enums';

@Component({
  selector: 'nx-northwind-mt-slider',
  template: `
    <mat-slider
      aria-label="unit(s)"
      [disabled]="disabled"
      [color]="color"
      thumbLabel
      tickInterval="1"
      [min]="min"
      [max]="max"
      [step]="step"
    ></mat-slider>
  `,
  styleUrls: ['./mt-slider.component.scss']
})
export class MtSliderComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() isVertical: boolean = false;
  @Input() color: ThemePalette = MaterialColor.Primary;
  @Input() min: number = 0;
  @Input() max: number = 0;
  @Input() step: number = 0;
  @Input() value: number = 0;

  constructor() {
    console.log('nx-northwind-mt-slider constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-slider OnInit...');
  }
}

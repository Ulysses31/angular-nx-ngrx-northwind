/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { noop } from 'rxjs';
import { MaterialColor, SlideLabelPosition } from '../enums/enums';

@Component({
  selector: 'nx-northwind-mt-slide',
  template: `
    <mat-slide-toggle
      [disabled]="disabled"
      [color]="color"
      [checked]="checked"
      [(ngModel)]="value"
      [labelPosition]="labelPosition">
      {{ label }}
    </mat-slide-toggle>
  `,
  styleUrls: ['./mt-slide.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MtSlideComponent),
      multi: true
    }
  ]
})
export class MtSlideComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() color: ThemePalette = MaterialColor.Primary;
  @Input() checked: boolean = false;
  @Input() label: string = 'Slide me!';
  @Input() labelPosition: SlideLabelPosition =
    SlideLabelPosition.After;

  private innerValue: any = '';
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor() {
    console.log('nx-northwind-mt-slide constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-slide OnInit...');
  }

  get value(): any {
    return this.innerValue;
  }

  set value(val: any) {
    if (val !== this.innerValue) {
      this.innerValue = val;
      this.onChangeCallback(val);
    }
  }

  onBlur(): void {
    this.onTouchedCallback();
  }

  writeValue(value: any): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
}

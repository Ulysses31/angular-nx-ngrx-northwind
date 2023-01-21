/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { noop } from 'rxjs';
import { MtInputAppearance } from '../enums/enums';

@Component({
  selector: 'nx-northwind-mt-input-number',
  template: `
    <mat-form-field
      class="input-full-width"
      [appearance]="appearance">
      <mat-label>{{ label }}</mat-label>
      <input
        type="number"
        matInput
        [placeholder]="placeHolder"
        [readonly]="readonly"
        [(ngModel)]="value"
        (blur)="onBlur()" />
    </mat-form-field>
  `,
  styleUrls: ['./mt-input-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MtInputNumberComponent),
      multi: true
    }
  ]
})
export class MtInputNumberComponent implements OnInit {
  @Input() label: string = 'Material Number Input';
  @Input() placeHolder: string = 'Material Number Input';
  @Input() readonly: boolean = false;
  @Input() appearance: MatFormFieldAppearance =
    MtInputAppearance.Fill;

  private innerValue: any = '';
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor() {
    console.log('nx-northwind-mt-input-number constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-input-number OnInit...');
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

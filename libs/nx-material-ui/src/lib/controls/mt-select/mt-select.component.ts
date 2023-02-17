/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { noop } from 'rxjs';
import { MtSelectItem } from '../interfaces/select-items.interface';

@Component({
  selector: 'nx-northwind-mt-select',
  template: `
    <mat-form-field class="input-full-width" appearance="fill">
      <mat-label>{{ label }}</mat-label>
      <mat-select
        [id]="id"
        [disabled]="disabled"
        [multiple]="isMultipleSelection"
        [placeholder]="placeholder"
        [(ngModel)]="value"
        (blur)="onBlur()"
      >
        <mat-option
          *ngFor="let item of selectItems"
          [value]="item.value"
          [disabled]="disabled"
         >
          {{ item.label }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styleUrls: ['./mt-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MtSelectComponent),
      multi: true
    }
  ]
})
export class MtSelectComponent
  implements OnInit, ControlValueAccessor
{
  @Input() id: string = '';
  @Input() disabled: boolean = false;
  @Input() isMultipleSelection: boolean = false;
  @Input() placeholder: string = 'Select an option';
  @Input() label: string = 'Label';
  @Input() selectItems: MtSelectItem[] = [];

  private innerValue: any = '';
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor() {
    console.log('nx-northwind-mt-select constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-select OnInit...');
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

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { noop } from 'rxjs';
import { MtInputAppearance } from '../enums/enums';

@Component({
  selector: 'nx-northwind-mt-input-text',
  template: `
    <mat-form-field
      class="input-full-width"
      [appearance]="appearance">
      <mat-label>{{ label }}</mat-label>
      <input
        type="text"
        matInput
        [disabled]="disabled"
        [placeholder]="placeHolder"
        [readonly]="readonly"
        [(ngModel)]="value"
        (blur)="onBlur()"
        [required]="required"
        #input="ngModel" />
      <button
        *ngIf="value && isClosable"
        matSuffix
        mat-icon-button
        aria-label="Clear"
        (click)="value = ''">
        <mat-icon>close</mat-icon>
      </button>
    </mat-form-field>
  `,
  styleUrls: ['./mt-input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MtInputTextComponent),
      multi: true
    }
  ]
})
export class MtInputTextComponent
  implements OnInit, ControlValueAccessor
{
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() label: string = 'Material Text Input';
  @Input() placeHolder: string = 'Material Text Input';
  @Input() readonly: boolean = false;
  @Input() isClosable: boolean = true;
  @Input() appearance: MatFormFieldAppearance =
    MtInputAppearance.Fill;

  private innerValue: any = '';
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor() {
    console.log('nx-northwind-mt-input-text constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-input-text OnInit...');
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

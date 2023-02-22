/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { noop } from 'rxjs';

@Component({
  selector: 'nx-northwind-mt-lookup',
  template: `
    <mat-form-field appearance="fill" class="input-full-width">
      <mat-label>{{ label }}</mat-label>
      <input
        matInput
        type="text"
        [id]="id"
        [name]="name"
        [disabled]="disabled"
        [placeholder]="placeHolder"
        [readonly]="readonly"
        [disabled]="disabled"
        [required]="required"
        [(ngModel)]="value"
        (blur)="onBlur()"
        [value]="123"
        #input="ngModel"
      />
      <button
        mat-icon-button
        matSuffix
        (click)="command(commandArgs)"
        [attr.aria-label]="'Hide password'"
        [attr.aria-pressed]="null">
        <mat-icon>{{ icon }}</mat-icon>
      </button>
    </mat-form-field>
  `,
  styleUrls: ['./mt-lookup.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MtLookupComponent),
      multi: true
    }
  ]
})
export class MtLookupComponent
  implements OnInit, ControlValueAccessor
{
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() command!: (args: any) => void;
  @Input() commandArgs: any;
  @Input() label: string = 'Material Lookup';
  @Input() icon: string = 'search';
  @Input() placeHolder: string = 'Material Text Input';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() readonly: boolean = false;
  @Input() toolTipMessage: string = '';
  tipPosition: TooltipPosition = 'above';

  private innerValue: any = '';
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor() {
    console.log('nx-northwind-mt-lookup constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-lookup OnInit...');
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

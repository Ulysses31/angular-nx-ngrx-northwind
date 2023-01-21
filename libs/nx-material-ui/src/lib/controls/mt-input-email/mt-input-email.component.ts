/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { noop } from 'rxjs';
import { MtInputAppearance } from '../enums/enums';

@Component({
  selector: 'nx-northwind-mt-input-email',
  template: `
    <mat-form-field
      class="input-full-width"
      [appearance]="appearance">
      <mat-label>{{ label }}</mat-label>
      <input
        type="email"
        matInput
        [placeholder]="placeHolder"
        [readonly]="readonly"
        [(ngModel)]="value"
        (blur)="onBlur()" />
      <button
        *ngIf="value"
        matSuffix
        mat-icon-button
        aria-label="Clear"
        (click)="value = ''">
        <mat-icon>close</mat-icon>
      </button>
    </mat-form-field>
  `,
  styleUrls: ['./mt-input-email.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MtInputEmailComponent),
      multi: true
    }
  ]
})
export class MtInputEmailComponent implements OnInit {
  @Input() label: string = 'Material Email Input';
  @Input() placeHolder: string = 'Ex. email@example.com';
  @Input() readonly: boolean = false;
  @Input() appearance: MatFormFieldAppearance =
    MtInputAppearance.Fill;

  private innerValue: any = '';
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor() {
    console.log('nx-northwind-mt-input-email constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-input-email OnInit...');
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

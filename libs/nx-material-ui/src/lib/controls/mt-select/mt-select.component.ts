/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import { MtSelectItem } from '../interfaces/select-items.interface';

@Component({
  selector: 'nx-northwind-mt-select',
  template: `
    <mat-form-field appearance="fill">
      <mat-label>{{ label }}</mat-label>
      <mat-select
        [disabled]="disabled"
        [multiple]="isMultipleSelection"
        [placeholder]="placeholder">
        <mat-option
          *ngFor="let item of selectItems"
          [value]="item.value"
          [disabled]="item.disabled">
          {{ item.label }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styleUrls: ['./mt-select.component.scss']
})
export class MtSelectComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() isMultipleSelection: boolean = false;
  @Input() placeholder: string = 'Select an option';
  @Input() label: string = 'Label';
  @Input() selectItems: MtSelectItem[] = [];

  constructor() {
    console.log('nx-northwind-mt-select constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-select OnInit...');
  }
}

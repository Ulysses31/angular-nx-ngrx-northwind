/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import { MtRadioItem } from '../interfaces/radio-items.interface';

@Component({
  selector: 'nx-northwind-mt-radio',
  template: ` <mat-radio-group
    aria-label="Select an option"
    [disabled]="disabled">
    <mat-radio-button
      *ngFor="let item of radioItems"
      [value]="item.value">
      {{ item.label }}
    </mat-radio-button>
  </mat-radio-group>`,
  styleUrls: ['./mt-radio.component.scss']
})
export class MtRadioComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() radioItems: MtRadioItem[] = [];

  constructor() {
    console.log('nx-northwind-mt-radio constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-radio OnInit...');
  }
}

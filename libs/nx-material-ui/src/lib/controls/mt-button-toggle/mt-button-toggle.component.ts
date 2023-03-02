/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonToggleAppearance } from '@angular/material/button-toggle';
import { noop } from 'rxjs';
import { MtToggleButtonGroup } from '../interfaces/toggle-btn-group.interface';

@Component({
  selector: 'nx-northwind-mt-button-toggle',
  template: `
    <mat-button-toggle-group
      #group="matButtonToggleGroup"
      name="fontStyle"
      aria-label="Font Style"
      [multiple]="multiple"
      [appearance]="appearance"
      [(ngModel)]="value"
    >
      <mat-button-toggle
        *ngFor="let btn of toggleBtns"
        [value]="btn.value">
        <mat-icon *ngIf="btn.icon">{{ btn.icon }}</mat-icon>
        {{ btn.label }}
      </mat-button-toggle>
    </mat-button-toggle-group>
    <!-- Selected: {{group.value}} -->
  `,
  styleUrls: ['./mt-button-toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MtButtonToggleComponent),
      multi: true
    }
  ]
})
export class MtButtonToggleComponent implements OnInit {
  @Input() toggleBtns: MtToggleButtonGroup[] = [];
  @Input() multiple: boolean = false;
  @Input() appearance: MatButtonToggleAppearance = 'standard';

  private innerValue: any = '';
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor() {
    console.log('nx-northwind-mt-button-toggle constructor...');
    // this.toggleBtns = [
    //   {
    //     id: 'format_align_left',
    //     ariaLabel: 'format_align_left',
    //     icon: 'format_align_left',
    //     value: 'left',
    //   },
    //   {
    //     id: 'format_align_center',
    //     ariaLabel: 'format_align_center',
    //     icon: 'format_align_center',
    //     value: 'center',
    //   },
    //   {
    //     id: 'format_align_right',
    //     ariaLabel: 'format_align_right',
    //     icon: 'format_align_right',
    //     value: 'right',
    //   },
    //   {
    //     id: 'format_align_justify',
    //     ariaLabel: 'format_align_justify',
    //     icon: 'format_align_justify',
    //     value: 'justify',
    //   }
    // ];
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-button-toggle OnInit...');
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

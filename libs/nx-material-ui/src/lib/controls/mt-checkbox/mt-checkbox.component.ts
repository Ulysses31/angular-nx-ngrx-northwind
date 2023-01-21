/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import { CheckboxLabelPlace, MaterialColor } from '../enums/enums';

@Component({
  selector: 'nx-northwind-mt-checkbox',
  template: `
    <mat-checkbox
      [disabled]="disabled"
      [labelPosition]="labelPosition"
      [checked]="checked"
      [color]="color">
      {{ label }}
    </mat-checkbox>
  `,
  styleUrls: ['./mt-checkbox.component.scss']
  // When user clicks on the mat-checkbox,
  // the default behavior is toggle checked value and set indeterminate to false.
  // This behavior can be customized by providing a new value of
  // MAT_CHECKBOX_DEFAULT_OPTIONS to the checkbox.
  // providers: [
  //   {
  //     provide: MAT_CHECKBOX_DEFAULT_OPTIONS,
  //     useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions
  //   }
  // ]
})
export class MtCheckboxComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() checked: boolean = false;
  @Input() labelPosition: CheckboxLabelPlace =
    CheckboxLabelPlace.After;
  @Input() color: MaterialColor = MaterialColor.Warn;
  @Input() label: string = 'Check me!';

  constructor() {
    console.log('nx-northwind-mt-checkbox constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-checkbox OnInit...');
  }
}

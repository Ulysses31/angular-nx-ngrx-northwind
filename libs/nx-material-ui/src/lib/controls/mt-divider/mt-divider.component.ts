/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nx-northwind-mt-divider',
  template: `
    <mat-divider
      class="mat-divider-list"
      [inset]="isInset"
      [vertical]="isVertical"></mat-divider>
  `,
  styleUrls: ['./mt-divider.component.scss']
})
export class MtDividerComponent implements OnInit {
  @Input() isInset: boolean = false;
  @Input() isVertical: boolean = false;

  constructor() {
    console.log('nx-northwind-mt-divider constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-divider OnInit...');
  }
}

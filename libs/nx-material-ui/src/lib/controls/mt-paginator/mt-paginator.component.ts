/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'nx-northwind-mt-paginator',
  template: ` <mat-paginator
    [disabled]="disabled"
    [length]="length"
    [pageSize]="pageSize"
    [pageSizeOptions]="pageSizeOptions"
    (page)="pageEvent = $event"
    aria-label="Select page">
  </mat-paginator>`,
  styleUrls: ['./mt-paginator.component.scss']
})
export class MtPaginatorComponent implements OnInit {
  pageEvent?: PageEvent;
  @Input() disabled: boolean = false;
  @Input() length: number = 0;
  @Input() pageSize: number = 0;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor() {
    console.log('nx-northwind-mt-paginator constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-paginator OnInit...');
  }
}

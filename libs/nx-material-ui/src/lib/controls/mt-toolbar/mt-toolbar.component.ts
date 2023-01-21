/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import { MaterialColor } from '../enums/enums';

@Component({
  selector: 'nx-northwind-mt-toolbar',
  template: `
    <mat-toolbar [color]="color">
      <button
        mat-icon-button
        class="example-icon"
        aria-label="Example icon-button with menu icon"
        [matMenuTriggerFor]="menu">
        <mat-icon>menu</mat-icon>
      </button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item>
          <mat-icon>share</mat-icon> Share
        </button>
        <button mat-menu-item>
          <mat-icon>phonelink_setup</mat-icon> Phone Setup
        </button>
      </mat-menu>
      <span>{{ title }}</span>
      <span class="example-spacer"></span>
      <button
        mat-icon-button
        class="example-icon favorite-icon"
        aria-label="Settings">
        <mat-icon>settings</mat-icon>
      </button>
      <button mat-icon-button class="example-icon" aria-label="User">
        <mat-icon>person</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styleUrls: ['./mt-toolbar.component.scss']
})
export class MtToolbarComponent implements OnInit {
  @Input() title: string = 'Application';
  @Input() color: MaterialColor = MaterialColor.Basic;

  constructor() {
    console.log('nx-northwind-mt-toolbar constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-toolbar OnInit...');
  }
}

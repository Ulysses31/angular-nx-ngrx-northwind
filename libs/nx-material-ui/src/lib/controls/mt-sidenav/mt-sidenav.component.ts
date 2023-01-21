/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import { SideNavMode, SideNavPosition } from '../enums/enums';

@Component({
  selector: 'nx-northwind-mt-sidenav',
  template: `
    <mat-drawer-container
      class="sidenav-container"
      [hasBackdrop]="hasBackdrop">
      <mat-drawer
        #drawer
        class="sidenav"
        [mode]="mode"
        [opened]="opened"
        [position]="position">
        Drawer content
      </mat-drawer>
      <mat-drawer-content class="main-content">
        Main content
        <br />
        <nx-northwind-mt-button
          label="Toggle Sidenav"
          (click)="drawer.toggle()">
          Toggle Sidenav
        </nx-northwind-mt-button>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styleUrls: ['./mt-sidenav.component.scss']
})
export class MtSidenavComponent implements OnInit {
  @Input() mode: SideNavMode = SideNavMode.Over;
  @Input() hasBackdrop: boolean = false;
  @Input() opened: boolean = false;
  @Input() position: SideNavPosition = SideNavPosition.Start;

  constructor() {
    console.log('nx-northwind-mt-sidenav constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-sidenav OnInit...');
  }
}

/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Router } from '@angular/router';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { SideNavMode, SideNavPosition } from '../enums/enums';
import { MtSidebarMenuItem } from '../interfaces/sidebar-menu-items.interface';

@Component({
  selector: 'nx-northwind-mt-drawer',
  template: `
    <mat-drawer-container
      class="sidenav-container"
      [hasBackdrop]="hasBackdrop">
      <mat-drawer
        #drawer
        class="sidenav"
        [mode]="mode"
        [opened]="opened"
        [position]="position"
        (openedChange)="openedChanged($event)">
        <h3>Menu</h3>
        <hr style="border: 1px solid #e4e4e4" />
        <br />
        <ul>
          <li
            *ngFor="let menuItem of sidebarMenuItems"
            (click)="menuItem?.command(); drawer.close()">
            <mat-icon
              *ngIf="menuItem.active"
              style="float: left; margin: -2px 5px 0 0"
              >radio_button_checked</mat-icon
            >
            <mat-icon
              *ngIf="!menuItem.active"
              style="float: left; margin: -2px 5px 0 0"
              >radio_button_unchecked</mat-icon
            >
            {{ menuItem.text }}
          </li>
        </ul>
        <p
          style="position: absolute; bottom: -10px; width: 93%; color: #a1a1a1">
          <span style="display: flex; justify-content: center"
            >Northwind &copy; {{ curDate }}</span
          >
        </p>
      </mat-drawer>
      <mat-drawer-content class="main-content">
        <!-- #### Main ### -->
        <ng-content></ng-content>
        <!-- <app-menubar (isOn)="onOpened()"></app-menubar>
				<div style="margin: 20px 10px 10px 10px">
					<router-outlet></router-outlet>
				</div> -->
        <!-- #### Main ### -->
        <br />
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styleUrls: ['./mt-drawer.component.scss']
})
export class MtDrawerComponent implements OnInit, OnDestroy {
  hasBackdrop: boolean = true;
  @Input() opened: boolean = false;
  mode: SideNavMode = SideNavMode.Over;
  position: SideNavPosition = SideNavPosition.Start;
  openEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() openedChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() sidebarMenuItems: MtSidebarMenuItem[] = [];
  curDate: number = new Date().getFullYear();

  constructor(private router: Router) {}

  ngOnInit(): void {
    //this.openedChange.subscribe((data: boolean) => console.log(data));
    this.openEmit.subscribe((data: boolean) => (this.opened = data));
  }

  ngOnDestroy(): void {
    this.openEmit.complete();
    this.openEmit.unsubscribe();
    this.openedChange.complete();
    this.openedChange.unsubscribe();
  }

  onOpened(): void {
    this.openEmit.emit((this.opened = !this.opened));
    this.parseCurrentUrl();
  }

  openedChanged(ev: boolean): void {
    this.openEmit.emit(ev);
    this.openedChange.next(ev);
    this.parseCurrentUrl();
  }

  private parseCurrentUrl(): void {
    const url: string = this.router.url;
    this.clearMenuItems();
    const data: MtSidebarMenuItem = this.sidebarMenuItems.find(
      (x: MtSidebarMenuItem) =>
        '/' + x.text?.toLocaleLowerCase() === url.toLocaleLowerCase()
    ) as MtSidebarMenuItem;
    if (data) data.active = true;
  }

  private clearMenuItems() {
    this.sidebarMenuItems = this.sidebarMenuItems.map(
      (item: MtSidebarMenuItem) => {
        item.active = false;
        return item;
      }
    );
  }
}

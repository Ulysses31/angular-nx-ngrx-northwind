/* eslint-disable @typescript-eslint/no-inferrable-types */
import { EventEmitter, OnDestroy, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MaterialColor } from '../enums/enums';
import { MtStyleManager } from './mt-toolbar-themes';

@Component({
  selector: 'nx-northwind-mt-toolbar',
  template: `
    <mat-toolbar [color]="color">
      <button
        mat-icon-button
        class="example-icon print-hide"
        (click)="changeIsOpen()">
        <mat-icon>menu</mat-icon>
      </button>
      <span class="print-hide">{{ title }}</span>
      <span class="example-spacer"></span>

      <button
        mat-icon-button
        class="print-hide example-icon favorite-icon"
        aria-label="Settings"
        [matMenuTriggerFor]="menu">
        <mat-icon>settings</mat-icon>
      </button>

      <!-- Main Settings Menu -->
      <mat-menu #menu="matMenu">
        <button
          mat-menu-item
          [matMenuTriggerFor]="matThemeMenu">
          <mat-icon>format_color_fill</mat-icon> Theme
        </button>
      </mat-menu>
      <!-- Main Settings Menu -->

      <!-- Theme -->
      <mat-menu #matThemeMenu="matMenu">
        <button mat-menu-item (click)="setMatStyle(1)">
          <mat-icon *ngIf="themeAisSelected"
            >radio_button_checked</mat-icon
          >
          <mat-icon *ngIf="!themeAisSelected"
            >radio_button_unchecked</mat-icon
          >
          Deeppurple Amber
        </button>
        <button mat-menu-item (click)="setMatStyle(2)">
          <mat-icon *ngIf="themeBisSelected"
            >radio_button_checked</mat-icon
          >
          <mat-icon *ngIf="!themeBisSelected"
            >radio_button_unchecked</mat-icon
          >
          Indigo Pink
        </button>
        <button mat-menu-item (click)="setMatStyle(3)">
          <mat-icon *ngIf="themeCisSelected"
            >radio_button_checked</mat-icon
          >
          <mat-icon *ngIf="!themeCisSelected"
            >radio_button_unchecked</mat-icon
          >
          Pink Bluegrey
        </button>
        <button mat-menu-item (click)="setMatStyle(4)">
          <mat-icon *ngIf="themeDisSelected"
            >radio_button_checked</mat-icon
          >
          <mat-icon *ngIf="!themeDisSelected"
            >radio_button_unchecked</mat-icon
          >
          Purple Green
        </button>
      </mat-menu>
      <!-- Theme -->

      <!-- User -->
      <button
        mat-icon-button
        class="print-hide example-icon"
        aria-label="User">
        <mat-icon>person</mat-icon>
      </button>
      <!-- User -->
    </mat-toolbar>
    <ng-content></ng-content>
  `,
  styleUrls: ['./mt-toolbar.component.scss'],
  providers: [MtStyleManager]
})
export class MtToolbarComponent implements OnInit, OnDestroy {
  @Input() title: string = 'Application';
  @Input() color: MaterialColor = MaterialColor.Primary;
  @Output() isOpen: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  themeAisSelected: boolean = false;
  themeBisSelected: boolean = false;
  themeCisSelected: boolean = false;
  themeDisSelected: boolean = false;

  constructor(private styleManager: MtStyleManager) {
    console.log('nx-northwind-mt-toolbar constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-toolbar OnInit...');
    const themeSelected = localStorage.getItem('themeSelected');
    switch (themeSelected) {
      case '1':
        this.themeAisSelected = true;
        this.themeBisSelected = false;
        this.themeCisSelected = false;
        this.themeDisSelected = false;
        break;
      case '2':
        this.themeAisSelected = false;
        this.themeBisSelected = true;
        this.themeCisSelected = false;
        this.themeDisSelected = false;
        break;
      case '3':
        this.themeAisSelected = false;
        this.themeBisSelected = false;
        this.themeCisSelected = true;
        this.themeDisSelected = false;
        break;
      case '4':
        this.themeAisSelected = false;
        this.themeBisSelected = false;
        this.themeCisSelected = false;
        this.themeDisSelected = true;
        break;
      default:
        this.themeAisSelected = true;
        this.themeBisSelected = false;
        this.themeCisSelected = false;
        this.themeDisSelected = false;
        break;
    }
  }

  ngOnDestroy(): void {
    console.log('nx-northwind-mt-toolbar OnDestroy...');
    this.isOpen.complete();
    this.isOpen.unsubscribe();
  }

  changeIsOpen(): void {
    this.isOpen.emit(true);
  }

  setMatStyle(option: number): void {
    switch (option) {
      case 1:
        this.themeAisSelected = true;
        this.themeBisSelected = false;
        this.themeCisSelected = false;
        this.themeDisSelected = false;

        this.styleManager.setStyle(
          '',
          'https://material2-docs-dev.firebaseapp.com/deeppurple-amber.css'
        );
        localStorage.setItem(
          'theme',
          'https://material2-docs-dev.firebaseapp.com/deeppurple-amber.css'
        );
        localStorage.setItem('themeSelected', '1');
        break;
      case 2:
        this.themeAisSelected = false;
        this.themeBisSelected = true;
        this.themeCisSelected = false;
        this.themeDisSelected = false;

        this.styleManager.setStyle(
          '',
          'https://material2-docs-dev.firebaseapp.com/indigo-pink.css'
        );
        localStorage.setItem(
          'theme',
          'https://material2-docs-dev.firebaseapp.com/indigo-pink.css'
        );
        localStorage.setItem('themeSelected', '2');
        break;
      case 3:
        this.themeAisSelected = false;
        this.themeBisSelected = false;
        this.themeCisSelected = true;
        this.themeDisSelected = false;

        this.styleManager.setStyle(
          '',
          'https://material2-docs-dev.firebaseapp.com/pink-bluegrey.css'
        );
        localStorage.setItem(
          'theme',
          'https://material2-docs-dev.firebaseapp.com/pink-bluegrey.css'
        );
        localStorage.setItem('themeSelected', '3');
        break;
      case 4:
        this.themeAisSelected = false;
        this.themeBisSelected = false;
        this.themeCisSelected = false;
        this.themeDisSelected = true;

        this.styleManager.setStyle(
          '',
          'https://material2-docs-dev.firebaseapp.com/purple-green.css'
        );
        localStorage.setItem(
          'theme',
          'https://material2-docs-dev.firebaseapp.com/purple-green.css'
        );
        localStorage.setItem('themeSelected', '4');
        break;
      default:
        this.themeAisSelected = true;
        this.themeBisSelected = false;
        this.themeCisSelected = false;
        this.themeDisSelected = false;

        this.styleManager.setStyle(
          '',
          'https://material2-docs-dev.firebaseapp.com/deeppurple-amber.css'
        );
        localStorage.setItem(
          'theme',
          'https://material2-docs-dev.firebaseapp.com/deeppurple-amber.css'
        );
        localStorage.setItem('themeSelected', '1');
        break;
    }
  }
}

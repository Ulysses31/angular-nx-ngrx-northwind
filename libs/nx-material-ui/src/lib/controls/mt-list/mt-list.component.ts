/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import { MtListItem } from '../interfaces/list-item.interface';
import { MtListSection } from '../interfaces/list-section.interface';

@Component({
  selector: 'nx-northwind-mt-list',
  template: `
    <ng-container *ngIf="!checkboxSelection">
      <mat-list role="list" [disabled]="disabled">
        <ng-container *ngIf="!isSection">
          <mat-list-item
            role="listitem"
            *ngFor="let item of itemList">
            {{ item.label }}
          </mat-list-item>
        </ng-container>

        <ng-container *ngIf="isSection">
          <div *ngFor="let section of itemSection; let i = index">
            <div mat-subheader>{{ section.subheader }}</div>
            <mat-list-item *ngFor="let item of section.items">
              <mat-icon mat-list-icon *ngIf="item.icon">{{
                item.icon
              }}</mat-icon>
              <div mat-line>{{ item.label }}</div>
            </mat-list-item>
            <mat-divider
              *ngIf="
                i < itemSection.length - 1 && itemSection.length > 1
              "></mat-divider>
          </div>
        </ng-container>
      </mat-list>
    </ng-container>

    <ng-container *ngIf="checkboxSelection">
      <mat-selection-list
        #listItems
        [disabled]="disabled"
        [multiple]="isSelectionMultiple">
        <ng-container *ngIf="!isSection">
          <mat-list-option
            *ngFor="let item of itemList"
            [value]="item.value">
            {{ item.label }}
          </mat-list-option>
        </ng-container>

        <ng-container *ngIf="isSection">
          <div *ngFor="let section of itemSection; let i = index">
            <div mat-subheader>{{ section.subheader }}</div>
            <mat-list-option
              *ngFor="let item of section.items"
              [value]="item.value">
              <mat-icon mat-list-icon *ngIf="item.icon">{{
                item.icon
              }}</mat-icon>
              <div mat-line>{{ item.label }}</div>
            </mat-list-option>
            <mat-divider
              *ngIf="
                i < itemSection.length - 1 && itemSection.length > 1
              "></mat-divider>
          </div>
        </ng-container>
      </mat-selection-list>
      <mat-divider *ngIf="showCheckboxStatus"></mat-divider>
      <p *ngIf="showCheckboxStatus">
        <span *ngIf="isSelectionMultiple">
          Options selected:
          {{ listItems.selectedOptions.selected.length }}
        </span>
        <span *ngIf="!isSelectionMultiple">
          Selected value:
          {{ listItems.selectedOptions.selected[0].value }}
        </span>
      </p>
    </ng-container>
  `,
  styleUrls: ['./mt-list.component.scss']
})
export class MtListComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() itemList: MtListItem[] = [];
  @Input() isSection: boolean = false;
  @Input() itemSection: MtListSection[] = [];
  @Input() checkboxSelection: boolean = false;
  @Input() showCheckboxStatus: boolean = false;
  @Input() isSelectionMultiple: boolean = false;

  constructor() {
    console.log('nx-northwind-mt-list constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-list OnInit...');
  }
}

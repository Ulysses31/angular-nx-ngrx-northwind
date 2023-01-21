/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';
import {
  MaterialBtnAlign,
  MaterialButtonType,
  MaterialColor,
  ProgrBarMode
} from '../enums/enums';
import { MtCardActionsContent } from '../interfaces/card-actions-content.interface';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'nx-northwind-mt-card',
  template: ` <mat-card class="example-card">
    <mat-card-header>
      <div mat-card-avatar [class]="avatarClassPath"></div>
      <mat-card-title *ngIf="title">{{ title }}</mat-card-title>
      <mat-card-subtitle *ngIf="subTitle">{{
        subTitle
      }}</mat-card-subtitle>
    </mat-card-header>
    <img
      mat-card-image
      *ngIf="hasImage"
      [src]="imagePath"
      [alt]="imagePath" />
    <mat-card-content *ngIf="content">
      <p>{{ content }}</p>
    </mat-card-content>
    <mat-card-actions *ngIf="hasButtons" [align]="cardAction.aling">
      <ng-container *ngFor="let action of cardAction.buttons">
        <button
          *ngIf="cardAction.buttonsType === 'basic'"
          mat-button
          [disabled]="action.disabled"
          [color]="action.color"
          (click)="action.command()">
          <mat-icon>{{ action.icon }}</mat-icon> {{ action.text }}
        </button>
        <button
          *ngIf="cardAction.buttonsType === 'FAB'"
          mat-fab
          [disabled]="action.disabled"
          [color]="action.color"
          (click)="action.command()">
          <mat-icon>{{ action.icon }}</mat-icon>
        </button>
        <button
          *ngIf="cardAction.buttonsType === 'Mini FAB'"
          mat-mini-fab
          [disabled]="action.disabled"
          [color]="action.color"
          (click)="action.command()">
          <mat-icon>{{ action.icon }}</mat-icon>
        </button>
        <button
          *ngIf="cardAction.buttonsType === 'icon'"
          mat-icon-button
          [disabled]="action.disabled"
          [color]="action.color"
          (click)="action.command()">
          <mat-icon>{{ action.icon }}</mat-icon>
        </button>
        <button
          *ngIf="cardAction.buttonsType === 'flat'"
          mat-flat-button
          [disabled]="action.disabled"
          [color]="action.color"
          (click)="action.command()">
          <mat-icon>{{ action.icon }}</mat-icon> {{ action.text }}
        </button>
        <button
          *ngIf="cardAction.buttonsType === 'stroked'"
          mat-stroked-button
          [disabled]="action.disabled"
          [color]="action.color"
          (click)="action.command()">
          <mat-icon>{{ action.icon }}</mat-icon> {{ action.text }}
        </button>
        <button
          *ngIf="cardAction.buttonsType === 'raised'"
          mat-raised-button
          [disabled]="action.disabled"
          [color]="action.color"
          (click)="action.command()">
          <mat-icon>{{ action.icon }}</mat-icon> {{ action.text }}
        </button>
      </ng-container>
    </mat-card-actions>
    <mat-card-footer *ngIf="hasFooter">
      <mat-progress-bar
        *ngIf="hasPrgBar"
        [mode]="prgBarMode"></mat-progress-bar>
    </mat-card-footer>
  </mat-card>`,
  styleUrls: ['./mt-card.component.scss']
})
export class MtCardComponent implements OnInit {
  @Input() title: string = 'Material Card Title';
  @Input() subTitle: string = 'Material Card SubTitle';
  @Input() hasButtons: boolean = true;
  @Input() hasFooter: boolean = true;
  @Input() hasPrgBar: boolean = true;
  @Input() prgBarMode: ProgressBarMode = ProgrBarMode.Indeterminate;
  @Input() hasImage: boolean = true;
  @Input() imagePath: string =
    'https://material.angular.io/assets/img/examples/shiba2.jpg';
  @Input() avatarClassPath: string = 'example-header-image';
  @Input() content: string =
    'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.';
  @Input() cardAction: MtCardActionsContent = {
    aling: MaterialBtnAlign.Start,
    buttonsType: MaterialButtonType.Basic,
    buttons: [
      {
        disabled: false,
        color: MaterialColor.Basic,
        icon: '',
        text: 'LIKE',
        command: () => console.log('LIKE')
      },
      {
        disabled: false,
        color: MaterialColor.Basic,
        icon: '',
        text: 'SHARE',
        command: () => console.log('SHARE')
      }
    ]
  };

  constructor() {
    console.log('nx-northwind-mt-card constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-card OnInit...');
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { MtAccordionContent } from '../interfaces/accordion-content.interdace';

@Component({
  selector: 'nx-northwind-mt-expansion-panel',
  template: `
    <mat-accordion class="exp-panel-headers-align">
      <mat-expansion-panel
        [expanded]="step === i"
        (opened)="setStep(i)"
        *ngFor="let panel of panels; let i = index"
        [disabled]="panel.disabled"
        (opened)="panelOpenState = true"
        (closed)="panelOpenState = false">
        <mat-expansion-panel-header>
          <mat-panel-title>
            {{ panel.panelTitle }}
          </mat-panel-title>
          <mat-panel-description>
            {{ panel.panelDescription }}
            <mat-icon *ngIf="panel.icon">{{ panel.icon }}</mat-icon>
          </mat-panel-description>
        </mat-expansion-panel-header>
        {{ panel.panelContent }}
        <mat-action-row *ngIf="panel.hasActions">
          <button
            mat-button
            color="warn"
            *ngIf="i > 0"
            (click)="prevStep()">
            Previous
          </button>
          <button
            mat-button
            color="primary"
            *ngIf="i < panels.length - 1"
            (click)="nextStep()">
            Next
          </button>
          <button
            mat-button
            color="primary"
            *ngIf="i === panels.length - 1"
            (click)="setStep(0)">
            End
          </button>
        </mat-action-row>
      </mat-expansion-panel>
    </mat-accordion>
  `,
  styleUrls: ['./mt-expansion-panel.component.scss']
})
export class MtExpansionPanelComponent implements OnInit {
  step = 0;
  panelOpenState = true;
  @Input() panels: MtAccordionContent[] = [];

  constructor() {
    console.log('nx-northwind-mt-expansion-panel constructor...');
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-expansion-panel OnInit...');
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}

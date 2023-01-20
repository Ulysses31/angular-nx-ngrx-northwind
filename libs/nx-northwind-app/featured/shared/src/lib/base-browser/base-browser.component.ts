/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FunctionButtons } from '../interfaces/function-buttons.interface';

@Component({
  selector: 'nx-northwind-base-browser',
  templateUrl: './base-browser.component.html',
  styleUrls: ['./base-browser.component.scss']
})
export class BaseBrowserComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() title!: string;
  @Input() model$!: Observable<any>;
  @Input() headers: string[] = [];
  @Input() error!: Observable<any>;
  @Input() fnButtons: FunctionButtons[] = [];
  errorMessage!: string;

  private router = inject(Router);
  private elRef = inject(ElementRef);
  private selectedId!: string;
  public isModelVisible?: boolean = false;

  constructor() {
    console.log('BaseBrowserComponent constructor...');
  }

  ngOnInit(): void {
    console.log('BaseBrowserComponent OnInit...');

    this.initFunctionButtons();

    this.generateHeaders();

    this.error.subscribe((data) => {
      this.errorMessage = data ? data.error.message : '';
    });
  }

  ngAfterViewInit(): void {
    console.log('BaseBrowserComponent AfterViewInit...');
  }

  ngOnDestroy(): void {
    console.log('BaseBrowserComponent OnDestroy...');
  }

  private generateHeaders(): void {
    this.model$.subscribe((items: any[]) => {
      if (items.length > 0) this.headers = Object.getOwnPropertyNames(items[0]);
    });
  }

  private initFunctionButtons(): void {
    this.fnButtons.unshift(
      {
        id: 'new',
        label: 'New',
        disabled: false,
        command: () =>
          this.router.navigate([this.router.url, 0], {
            queryParams: { backUrl: this.router.url }
          })
      },
      {
        id: 'edit',
        label: 'Edit',
        disabled: true,
        command: () =>
          this.router.navigate([this.router.url, this.selectedId], {
            queryParams: { backUrl: this.router.url }
          })
      }
    );

    this.fnButtons.push({
      id: 'model',
      label: 'Model',
      disabled: false,
      command: () => (this.isModelVisible = !this.isModelVisible)
    });
  }

  checkBoxChange(): void {
    const bb = this.fnButtons.find((btn) => btn.id === 'edit');
    if (bb) bb.disabled = this.countCheckedItems() != 1;
  }

  private countCheckedItems(): number {
    this.selectedId = '';
    const chkList: string[] = [];

    const chks = this.elRef.nativeElement.querySelectorAll(
      'input[type=checkbox]'
    );

    chks.forEach((item: never) => {
      if (item['checked']) chkList.push(item['id']);
    });

    if (chkList.length == 1) this.selectedId = chkList[0];

    return chkList.length;
  }

  private getTypes(data: any) {
    let tmpObj = {
      type: '',
      title: ''
    };
    for (const key in data[0]) {
      if (Object.prototype.hasOwnProperty.call(data[0], key)) {
        const element = data[0][key];
        tmpObj = {
          type: typeof element,
          title: key
        };
        console.log(tmpObj);
      }
    }
  }

  private extractFieldNameId(data: any): string {
    const vCnt = 0;
    for (const key in data[0]) {
      if (vCnt === 0) {
        if (Object.prototype.hasOwnProperty.call(data[0], key)) {
          // console.log(key);
          return key as string;
        }
      }
    }
    return '';
  }
}

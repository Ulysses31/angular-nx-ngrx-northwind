/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  MaterialColor,
  MtDialogComponent,
  MtTableComponent,
  ProgrBarMode
} from '@nx-northwind/nx-material-ui';
import { Observable } from 'rxjs';
import { FunctionButtons } from '../interfaces/function-buttons.interface';

@Component({
  selector: 'nx-northwind-base-master-detail-browser',
  templateUrl: './base-master-detail-browser.component.html',
  styleUrls: ['./base-master-detail-browser.component.scss']
})
export class BaseMasterDetailBrowserComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() title!: string;
  @Input() model$!: Observable<any>;
  @Input() modelDetails$!: Observable<any>;
  @Input() headers: string[] = [];
  @Input() headersDetails: string[] = [];
  @Input() error!: Observable<any>;
  @Input() fnButtons: FunctionButtons[] = [];
  @Input() isLoaded: boolean = true;

  public mode: ProgrBarMode = ProgrBarMode.Indeterminate;
  public isSelectable: boolean = true;
  public modelData: any[] = [];
  public modelDetailsData: any[] = [];
  public errorMessage!: string;
  private snackDuration: number = 3000; //ms -> 3sec

  //@ViewChild(MtTableComponent, { static: true }) tableComp!: MtTableComponent;

  @ViewChild('ordersTable') ordersTableComp!: MtTableComponent;
  @ViewChild('ordersDetailsTable')
  ordersDetailsTableComp!: MtTableComponent;

  private router = inject(Router);
  private elRef = inject(ElementRef);
  private selectedId!: string;
  public isModelVisible?: boolean = false;

  constructor(
    public _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    console.log('BaseMasterDetailBrowserComponent constructor...');
  }

  ngOnInit(): void {
    console.log('BaseMasterDetailBrowserComponent OnInit...');

    this.initFunctionButtons();

    this.generateHeaders();
    this.generateHeadersDetails();

    this.error.subscribe((data) => {
      this.errorMessage = data ? data.error.message : '';
      if (this.errorMessage.length > 0) {
        this._snackBar.open(this.errorMessage, 'Close', {
          duration: this.snackDuration
        });
      }
    });
  }

  ngAfterViewInit(): void {
    console.log('BaseMasterDetailBrowserComponent AfterViewInit...');
    this.updateOrdersTable();
  }

  ngOnDestroy(): void {
    console.log('BaseMasterDetailBrowserComponent OnDestroy...');
  }

  private generateHeaders(): void {
    this.model$.subscribe((items: any[]) => {
      if (items.length > 0) {
        this.modelData = [...items];
        this.headers = Object.getOwnPropertyNames(items[0]);
      }
    });
  }

  private generateHeadersDetails(): void {
    this.modelDetails$.subscribe((items: any[]) => {
      if (items.length > 0) {
        // this.modelDetailsData = [...items];
        this.headersDetails = Object.getOwnPropertyNames(items[0]);
      }
    });
  }

  private initFunctionButtons(): void {
    this.fnButtons.unshift(
      {
        id: 'new',
        label: 'New',
        toolTipMessage: 'Insert new record',
        disabled: false,
        icon: 'add',
        color: MaterialColor.Basic,
        command: () =>
          this.router.navigate([this.router.url, 0], {
            queryParams: { backUrl: this.router.url }
          })
      },
      {
        id: 'edit',
        label: 'Edit',
        toolTipMessage: 'Edit selected record',
        disabled: false,
        icon: 'edit',
        color: MaterialColor.Basic,
        command: () => this.editSelectedItem()
      }
    );

    this.fnButtons.push({
      id: 'model',
      label: 'Model',
      toolTipMessage: 'Toggle view model state',
      color: MaterialColor.Basic,
      icon: 'build',
      disabled: false,
      command: () => (this.isModelVisible = !this.isModelVisible)
    });
  }

  private editSelectedItem(): void {
    if (!this.ordersTableComp.selectedRecord) {
      this._snackBar.open('Select a record...', 'Close', {
        duration: 3000
      });
    } else {
      const id = this.ordersTableComp.selectedRecord[this.headers[0]];
      this.router.navigate([this.router.url, id], {
        queryParams: { backUrl: this.router.url }
      });
    }
  }

  private updateOrdersTable() {
    this.model$.subscribe((data: any) => {
      if (data) {
        this.modelData = data;
        this.ordersTableComp.dataSource = [...this.modelData];
        this.ordersTableComp.ngOnInit();
        this.ordersTableComp.ngAfterViewInit();
      }
    });
  }

  public updateOrdersDetailsTable(
    showEmpty: boolean,
    newData: any[]
  ) {
    if (!showEmpty) {
      if (newData.length === 0) {
        this.modelDetails$.subscribe((data: any) => {
          if (data) {
            this.modelDetailsData = data;
          }
        });
      } else {
        this.modelDetailsData = newData;
      }
    } else {
      this.modelDetailsData = [];
    }

    if (this.ordersDetailsTableComp.dataSource) {
      this.ordersDetailsTableComp.dataSource = [
        ...this.modelDetailsData
      ];
      this.ordersDetailsTableComp.ngOnInit();
      this.ordersDetailsTableComp.ngAfterViewInit();
      this.ordersDetailsTableComp.isSelectable = false;
      this.generateHeadersDetails();
    }
  }

  public confirmDialog(
    title: string,
    content: string
  ): Observable<boolean> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: title,
      content: content,
      choice: [true, false]
    };

    const dialogRef = this.dialog.open(
      MtDialogComponent,
      dialogConfig
    );

    return dialogRef.afterClosed();
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

  private extractFieldNameIdFromArray(data: any): string {
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

  private extractFieldNameIdFromObj(data: any): string {
    const vCnt = 0;
    for (const key in data) {
      if (vCnt === 0) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          // console.log(key);
          return key as string;
        }
      }
    }
    return '';
  }

  public getSelectRecord(subj: any): void {
    console.log(subj);
    if (subj) {
      this.modelDetails$.subscribe((items: any[]) => {
        const result = items.filter(
          (item) =>
            item[this.extractFieldNameIdFromObj(subj)] ===
            subj[this.extractFieldNameIdFromObj(subj)]
        );
        if (result.length > 0) {
          this.updateOrdersDetailsTable(false, result);
        } else {
          this.updateOrdersDetailsTable(true, []);
        }
      });
    } else {
      this.updateOrdersDetailsTable(true, []);
    }
  }
}

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
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  MaterialColor,
  MtTableComponent
} from '@nx-northwind/nx-material-ui';
import { Observable } from 'rxjs';
import { FunctionButtons } from '../interfaces/function-buttons.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MtDialogComponent } from 'libs/nx-material-ui/src/lib/controls/mt-dialog/mt-dialog.component';

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
  // @Input() color: MaterialColor = MaterialColor.Primary;
  public isSelectable: boolean = true;
  public modelData: any[] = [];
  public errorMessage!: string;
  private snackDuration: number = 3000; //ms -> 3sec

  @ViewChild(MtTableComponent, { static: true })
  tableComp!: MtTableComponent;

  private router = inject(Router);
  private elRef = inject(ElementRef);
  private selectedId!: string;
  public isModelVisible?: boolean = false;

  constructor(
    public _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    console.log('BaseBrowserComponent constructor...');
  }

  ngOnInit(): void {
    console.log('BaseBrowserComponent OnInit...');

    this.initFunctionButtons();

    this.generateHeaders();

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
    console.log('BaseBrowserComponent AfterViewInit...');
    this.model$.subscribe(() => {
      if (this.modelData) {
        this.tableComp.dataSource = [...this.modelData];
        this.tableComp.ngOnInit();
        this.tableComp.ngAfterViewInit();
      }
    });
  }

  ngOnDestroy(): void {
    console.log('BaseBrowserComponent OnDestroy...');
  }

  private generateHeaders(): void {
    this.model$.subscribe((items: any[]) => {
      if (items.length > 0) {
        this.modelData = [...items];
        this.headers = Object.getOwnPropertyNames(items[0]);
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
    if (!this.tableComp.selectedRecord) {
      this._snackBar.open('Select a record...', 'Close', {
        duration: 3000
      });
    } else {
      const id = this.tableComp.selectedRecord[this.headers[0]];
      this.router.navigate([this.router.url, id], {
        queryParams: { backUrl: this.router.url }
      });
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

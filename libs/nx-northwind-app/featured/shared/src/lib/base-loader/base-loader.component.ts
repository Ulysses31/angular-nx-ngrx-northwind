/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterViewInit,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialColor } from '@nx-northwind/nx-material-ui';
import { MtDialogComponent } from 'libs/nx-material-ui/src/lib/controls/mt-dialog/mt-dialog.component';
import { Observable } from 'rxjs';
import { FunctionButtons } from '../interfaces/function-buttons.interface';
@Component({
  selector: 'nx-northwind-base-loader',
  templateUrl: './base-loader.component.html',
  styleUrls: ['./base-loader.component.scss']
})
export class BaseLoaderComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() title!: string;
  @Input() model$!: any;
  @Input() error!: Observable<any>;
  @Input() fnButtons: FunctionButtons[] = [];
  errorMessage!: string;

  public router = inject(Router);
  public route = inject(ActivatedRoute);
  public isModelVisible?: boolean = false;
  private snackDuration: number = 3000; //ms -> 3sec

  constructor(
    public _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    console.log('BaseLoaderComponent constructor...');
  }

  ngOnInit(): void {
    console.log('BaseBrowserComponent ngOnInit...');

    this.initFunctionButtons();

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
    console.log('BaseBrowserComponent ngAfterViewInit...');
  }

  ngOnDestroy(): void {
    console.log('BaseBrowserComponent ngOnDestroy...');
  }

  private initFunctionButtons(): void {
    this.fnButtons.push({
      id: 'model',
      label: 'Model',
      toolTipMessage: 'Toggle view model state',
      disabled: false,
      icon: 'build',
      color: MaterialColor.Basic,
      command: () => (this.isModelVisible = !this.isModelVisible)
    });

    this.fnButtons.unshift({
      id: 'back',
      label: 'Back',
      toolTipMessage: 'Navigate back',
      disabled: false,
      icon: 'arrow_back',
      color: MaterialColor.Basic,
      command: () => history.back()
    });
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
}

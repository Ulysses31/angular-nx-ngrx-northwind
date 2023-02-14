/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AfterViewInit, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialColor, MtDialogComponent, ProgrBarMode } from '@nx-northwind/nx-material-ui';
import { Observable } from 'rxjs';
import { FunctionButtons } from '../interfaces/function-buttons.interface';

@Component({
  selector: 'nx-northwind-base-master-detail-loader',
  templateUrl: './base-master-detail-loader.component.html',
  styleUrls: ['./base-master-detail-loader.component.scss']
})
export class BaseMasterDetailLoaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() title!: string;
  @Input() model$!: any;
  @Input() modelDetails$!: any;
  @Input() error!: Observable<any>;
  @Input() fnButtons: FunctionButtons[] = [];
  @Input() isLoaded: boolean = true;
  errorMessage!: string;

  public mode: ProgrBarMode = ProgrBarMode.Indeterminate;
  public router = inject(Router);
  public route = inject(ActivatedRoute);
  public isModelVisible?: boolean = false;
  private snackDuration: number = 3000; //ms -> 3sec

  constructor(
    public _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    console.log('BaseMasterDetailLoaderComponent constructor...');
  }

  ngOnInit(): void {
    console.log('BaseMasterDetailLoaderComponent ngOnInit...');

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
    console.log('BaseMasterDetailLoaderComponent ngAfterViewInit...');
  }

  ngOnDestroy(): void {
    console.log('BaseMasterDetailLoaderComponent ngOnDestroy...');
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

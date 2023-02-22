/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { MaterialColor } from '@nx-northwind/nx-material-ui';
import {
  BaseBrowserComponent,
  FunctionButtons
} from '@nx-northwind/nx-northwind-app/featured/shared';
import { initEmployees } from '../+state/employees.actions';
import { EmployeesState } from '../+state/employees.reducer';
import {
  selectAllEmployees,
  selectEmployeesError,
  selectEmployeesLoaded
} from '../+state/employees.selectors';

@Component({
  selector: 'nx-northwind-employee-browser',
  templateUrl: './employee-browser.component.html',
  styleUrls: ['./employee-browser.component.scss']
})
export class EmployeeBrowserComponent extends BaseBrowserComponent {
  employees$ = this.store.select(selectAllEmployees);
  error$ = this.store.select(selectEmployeesError);
  isLoaded$ = this.store.select(selectEmployeesLoaded);
  loaded: boolean = true;

  fnButtons$: FunctionButtons[] = [
    {
      id: 'refresh',
      label: 'Refresh',
      color: MaterialColor.Basic,
      icon: 'sync',
      disabled: false,
      toolTipMessage: 'Refresh browser data',
      command: () => this.browseData()
    }
  ];

  constructor(
    public override _snackBar: MatSnackBar,
    public override dialog: MatDialog,
    public dialogRef: MatDialogRef<EmployeeBrowserComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      isDialog: boolean;
      employees: any;
      isLoaded: any;
      error: any;
    },
    private store: Store<EmployeesState>
  ) {
    super(_snackBar, dialog);
    console.log('constructor Employee Browser...');
  }

  override ngOnInit(): void {
    console.log('ngOnInit Employee Browser...');

    if (this.data.isDialog) {
      this.error$ = this.data.error;
      this.isLoaded$ = this.data.isLoaded;
      this.employees$ = this.data.employees;
    }

    this.isLoaded$.subscribe((isloaded: boolean) => {
      this.loaded = isloaded;
    });

    this.browseData();
  }

  override ngAfterViewInit(): void {
    console.log('ngAfterViewInit Employee Browser...');
  }

  override ngOnDestroy(): void {
    console.log('ngOnDestroy Employee Browser...');
  }

  private browseData(): void {
    this.store.dispatch(initEmployees());
  }
}

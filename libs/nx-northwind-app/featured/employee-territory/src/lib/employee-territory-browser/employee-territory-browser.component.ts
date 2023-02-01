/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { MaterialColor } from '@nx-northwind/nx-material-ui';
import {
  BaseBrowserComponent,
  FunctionButtons
} from '@nx-northwind/nx-northwind-app/featured/shared';
import { initEmployeeTerritories } from '../+state/employee-territories.actions';
import { EmployeeTerritoriesState } from '../+state/employee-territories.reducer';
import {
  selectAllEmployeeTerritories,
  selectEmployeeTerritoriesError,
  selectEmployeeTerritoriesLoaded
} from '../+state/employee-territories.selectors';

@Component({
  selector: 'nx-northwind-employee-territory-browser',
  templateUrl: './employee-territory-browser.component.html',
  styleUrls: ['./employee-territory-browser.component.scss']
})
export class EmployeeTerritoryBrowserComponent extends BaseBrowserComponent {
  employeeTerritories$ = this.store.select(
    selectAllEmployeeTerritories
  );
  error$ = this.store.select(selectEmployeeTerritoriesError);
  isLoaded$ = this.store.select(selectEmployeeTerritoriesLoaded);
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
    private store: Store<EmployeeTerritoriesState>
  ) {
    super(_snackBar, dialog);
    console.log('constructor EmployeeTerritory Browser...');
  }

  override ngOnInit(): void {
    console.log('ngOnInit EmployeeTerritory Browser...');

    this.isLoaded$.subscribe((isloaded: boolean) => {
      this.loaded = isloaded;
    });

    this.browseData();
  }

  override ngAfterViewInit(): void {
    console.log('ngAfterViewInit EmployeeTerritory Browser...');
  }

  override ngOnDestroy(): void {
    console.log('ngOnDestroy EmployeeTerritory Browser...');
  }

  private browseData(): void {
    this.store.dispatch(initEmployeeTerritories());
  }
}

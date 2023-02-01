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
import { initCustomers } from '../+state/customers.actions';
import { CustomersState } from '../+state/customers.reducer';
import {
  selectAllCustomers,
  selectCustomersError,
  selectCustomersLoaded
} from '../+state/customers.selectors';

@Component({
  selector: 'nx-northwind-customer-browser',
  templateUrl: './customer-browser.component.html',
  styleUrls: ['./customer-browser.component.scss']
})
export class CustomerBrowserComponent extends BaseBrowserComponent {
  customers$ = this.store.select(selectAllCustomers);
  error$ = this.store.select(selectCustomersError);
  isLoaded$ = this.store.select(selectCustomersLoaded);
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
    private store: Store<CustomersState>
  ) {
    super(_snackBar, dialog);
    console.log('constructor Customer Browser...');
  }

  override ngOnInit(): void {
    console.log('ngOnInit Customer Browser...');

    this.isLoaded$.subscribe((isloaded: boolean) => {
      this.loaded = isloaded;
    });

    this.browseData();
  }

  override ngAfterViewInit(): void {
    console.log('ngAfterViewInit Customer Browser...');
  }

  override ngOnDestroy(): void {
    console.log('ngOnDestroy Customer Browser...');
  }

  private browseData(): void {
    this.store.dispatch(initCustomers());
  }
}

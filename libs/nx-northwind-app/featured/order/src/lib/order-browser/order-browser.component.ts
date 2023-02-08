/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { MaterialColor } from '@nx-northwind/nx-material-ui';
import { CategoriesState } from '@nx-northwind/nx-northwind-app/featured/category';
import {
  BaseBrowserComponent,
  FunctionButtons
} from '@nx-northwind/nx-northwind-app/featured/shared';
import {
  selectAllOrders,
  selectOrdersError,
  selectOrdersLoaded
} from '../+state/orders.selectors';
import { initOrders } from './../+state/orders.actions';

@Component({
  selector: 'nx-northwind-order-browser',
  templateUrl: './order-browser.component.html',
  styleUrls: ['./order-browser.component.scss']
})
export class OrderBrowserComponent extends BaseBrowserComponent {
  orders$ = this.store.select(selectAllOrders);
  error$ = this.store.select(selectOrdersError);
  isLoaded$ = this.store.select(selectOrdersLoaded);
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
    private store: Store<CategoriesState>
  ) {
    super(_snackBar, dialog);
    console.log('constructor Order Browser...');
  }

  override ngOnInit(): void {
    console.log('ngOnInit Category Browser...');

    this.isLoaded$.subscribe((isloaded: boolean) => {
      this.loaded = isloaded;
    });

    this.browseData();
  }

  override ngAfterViewInit(): void {
    console.log('ngAfterViewInit Category Browser...');
  }

  override ngOnDestroy(): void {
    console.log('ngOnDestroy Category Browser...');
  }

  private browseData(): void {
    this.store.dispatch(initOrders());
  }
}

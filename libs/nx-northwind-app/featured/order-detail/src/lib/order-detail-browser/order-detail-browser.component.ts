/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  selectAllOrderDetails,
  selectOrderDetailsError,
  selectOrderDetailsLoaded
} from './../+state/order-details.selectors';
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { initOrderDetails } from './../+state/order-details.actions';
import { Component } from '@angular/core';
import {
  BaseBrowserComponent,
  FunctionButtons
} from '@nx-northwind/nx-northwind-app/featured/shared';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { MaterialColor } from '@nx-northwind/nx-material-ui';
import { OrderDetailsState } from '../+state/order-details.reducer';

@Component({
  selector: 'nx-northwind-order-detail-browser',
  templateUrl: './order-detail-browser.component.html',
  styleUrls: ['./order-detail-browser.component.scss']
})
export class OrderDetailBrowserComponent extends BaseBrowserComponent {
  orderDetails$ = this.store.select(selectAllOrderDetails);
  error$ = this.store.select(selectOrderDetailsError);
  isLoaded$ = this.store.select(selectOrderDetailsLoaded);
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
    private store: Store<OrderDetailsState>
  ) {
    super(_snackBar, dialog);
    console.log('constructor OrderDetails Browser...');
  }

  override ngOnInit(): void {
    console.log('ngOnInit OrderDetails Browser...');

    this.isLoaded$.subscribe((isloaded: boolean) => {
      this.loaded = isloaded;
    });

    this.browseData();
  }

  override ngAfterViewInit(): void {
    console.log('ngAfterViewInit OrderDetails Browser...');
  }

  override ngOnDestroy(): void {
    console.log('ngOnDestroy OrderDetails Browser...');
  }

  private browseData(): void {
    this.store.dispatch(initOrderDetails());
  }
}

/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { MaterialColor } from '@nx-northwind/nx-material-ui';
import {
  BaseMasterDetailBrowserComponent,
  FunctionButtons
} from '@nx-northwind/nx-northwind-app/featured/shared';
import {
  initOrderDetails,
  initOrders
} from '../+state/orders-master-detail.actions';
import {
  selectAllOrderDetails,
  selectAllOrders,
  selectOrdersError,
  selectOrdersLoaded
} from '../+state/orders-master-detail.selectors';
import { OrdersMasterDetailState } from './../+state/orders-master-detail.reducer';

@Component({
  selector: 'nx-northwind-order-master-detail-browser',
  templateUrl: './order-master-detail-browser.component.html',
  styleUrls: ['./order-master-detail-browser.component.scss']
})
export class OrderMasterDetailBrowserComponent extends BaseMasterDetailBrowserComponent {
  orders$ = this.store.select(selectAllOrders);
  ordersDetails$ = this.store.select(selectAllOrderDetails);
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
    private store: Store<OrdersMasterDetailState>
  ) {
    super(_snackBar, dialog);
    console.log('constructor OrderMasterDetail Browser...');
  }

  override ngOnInit(): void {
    console.log('ngOnInit OrderMasterDetail Browser...');

    this.isLoaded$.subscribe((isloaded: boolean) => {
      this.loaded = isloaded;
    });

    this.browseData();
  }

  override ngAfterViewInit(): void {
    console.log('ngAfterViewInit OrderMasterDetail Browser...');
  }

  override ngOnDestroy(): void {
    console.log('ngOnDestroy OrderMasterDetail Browser...');
  }

  private browseData(): void {
    this.store.dispatch(initOrders());
    this.store.dispatch(initOrderDetails());
  }
}

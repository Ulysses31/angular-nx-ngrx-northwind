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
import { initShippers } from '../+state/shippers.actions';
import { ShippersState } from '../+state/shippers.reducer';
import {
  selectAllShippers,
  selectShippersError,
  selectShippersLoaded
} from '../+state/shippers.selectors';

@Component({
  selector: 'nx-northwind-shipper-browser',
  templateUrl: './shipper-browser.component.html',
  styleUrls: ['./shipper-browser.component.scss']
})
export class ShipperBrowserComponent extends BaseBrowserComponent {
  shippers$ = this.store.select(selectAllShippers);
  error$ = this.store.select(selectShippersError);
  isLoaded$ = this.store.select(selectShippersLoaded);
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
    public dialogRef: MatDialogRef<ShipperBrowserComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      isDialog: boolean;
      shippers: any;
      isLoaded: any;
      error: any;
    },
    private store: Store<ShippersState>
  ) {
    super(_snackBar, dialog);
    console.log('constructor Shipper Browser...');
  }

  override ngOnInit(): void {
    console.log('ngOnInit Shipper Browser...');

    if (this.data.isDialog) {
      this.error$ = this.data.error;
      this.isLoaded$ = this.data.isLoaded;
      this.shippers$ = this.data.shippers;
    }

    this.isLoaded$.subscribe((isloaded: boolean) => {
      this.loaded = isloaded;
    });

    this.browseData();
  }

  override ngAfterViewInit(): void {
    console.log('ngAfterViewInit Shipper Browser...');
  }

  override ngOnDestroy(): void {
    console.log('ngOnDestroy Shipper Browser...');
  }

  private browseData(): void {
    this.store.dispatch(initShippers());
  }
}

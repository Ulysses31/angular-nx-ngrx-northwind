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
import { initSuppliers } from '../+state/suppliers.actions';
import { SuppliersState } from '../+state/suppliers.reducer';
import {
  selectAllSuppliers,
  selectSuppliersError,
  selectSuppliersLoaded
} from '../+state/suppliers.selectors';

@Component({
  selector: 'nx-northwind-supplier-browser',
  templateUrl: './supplier-browser.component.html',
  styleUrls: ['./supplier-browser.component.scss']
})
export class SupplierBrowserComponent extends BaseBrowserComponent {
  suppliers$ = this.store.select(selectAllSuppliers);
  error$ = this.store.select(selectSuppliersError);
  isLoaded$ = this.store.select(selectSuppliersLoaded);
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
    public dialogRef: MatDialogRef<SupplierBrowserComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      isDialog: boolean;
      suppliers: any;
      isLoaded: any;
      error: any;
    },
    private store: Store<SuppliersState>
  ) {
    super(_snackBar, dialog);
    console.log('constructor Supplier Browser...');
  }

  override ngOnInit(): void {
    console.log('ngOnInit Supplier Browser...');

    if (this.data.isDialog) {
      this.error$ = this.data.error;
      this.isLoaded$ = this.data.isLoaded;
      this.suppliers$ = this.data.suppliers;
    }

    this.isLoaded$.subscribe((isloaded: boolean) => {
      this.loaded = isloaded;
    });

    this.browseData();
  }

  override ngAfterViewInit(): void {
    console.log('ngAfterViewInit Supplier Browser...');
  }

  override ngOnDestroy(): void {
    console.log('ngOnDestroy Supplier Browser...');
  }

  private browseData(): void {
    this.store.dispatch(initSuppliers());
  }
}

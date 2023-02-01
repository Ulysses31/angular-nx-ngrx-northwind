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
import { initProducts } from '../+state/products.actions';
import { ProductsState } from '../+state/products.reducer';
import {
  selectAllProducts,
  selectProductsError,
  selectProductsLoaded
} from '../+state/products.selectors';

@Component({
  selector: 'nx-northwind-product-browser',
  templateUrl: './product-browser.component.html',
  styleUrls: ['./product-browser.component.scss']
})
export class ProductBrowserComponent extends BaseBrowserComponent {
  products$ = this.store.select(selectAllProducts);
  error$ = this.store.select(selectProductsError);
  isLoaded$ = this.store.select(selectProductsLoaded);
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
    private store: Store<ProductsState>
  ) {
    super(_snackBar, dialog);
    console.log('constructor Product Browser...');
  }

  override ngOnInit(): void {
    console.log('ngOnInit Product Browser...');

    this.isLoaded$.subscribe((isloaded: boolean) => {
      this.loaded = isloaded;
    });

    this.browseData();
  }

  override ngAfterViewInit(): void {
    console.log('ngAfterViewInit Product Browser...');
  }

  override ngOnDestroy(): void {
    console.log('ngOnDestroy Product Browser...');
  }

  private browseData(): void {
    this.store.dispatch(initProducts());
  }
}

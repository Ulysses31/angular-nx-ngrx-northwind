/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { MaterialColor } from '@nx-northwind/nx-material-ui';
import { ProductDto } from '@nx-northwind/nx-northwind-app/entities';
import {
  BaseLoaderComponent,
  FunctionButtons
} from '@nx-northwind/nx-northwind-app/featured/shared';
import {
  deleteProduct,
  initProduct,
  loadProductSuccess,
  postProduct,
  putProduct
} from '../+state/products.actions';
import { ProductsState } from '../+state/products.reducer';
import {
  selectProduct,
  selectProductsError,
  selectProductsLoaded
} from '../+state/products.selectors';

@Component({
  selector: 'nx-northwind-product-loader',
  templateUrl: './product-loader.component.html',
  styleUrls: ['./product-loader.component.scss']
})
export class ProductLoaderComponent extends BaseLoaderComponent {
  productModel!: ProductDto;
  product$ = this.store.select(selectProduct);
  error$ = this.store.select(selectProductsError);
  isLoaded$ = this.store.select(selectProductsLoaded);
  loaded: boolean = true;

  fnButtons$: FunctionButtons[] = [
    {
      id: 'new',
      label: 'New',
      toolTipMessage: 'Insert new record',
      disabled: false,
      icon: 'add',
      color: MaterialColor.Basic,
      command: () => {
        const path =
          this.route.snapshot.pathFromRoot[0].queryParams['backUrl'];
        this.router
          .navigate([path, 0], {
            queryParams: { backUrl: path }
          })
          .then(() => this.loadData());
      }
    },
    {
      id: 'delete',
      label: 'Delete',
      toolTipMessage: 'Delete current record',
      color: MaterialColor.Basic,
      icon: 'delete',
      disabled: false,
      command: () => this.deleteData()
    },
    {
      id: 'save',
      label: 'Save',
      toolTipMessage: 'Save current record',
      color: MaterialColor.Basic,
      icon: 'save',
      disabled: false,
      command: () => this.saveData()
    },
    {
      id: 'refresh',
      label: 'Refresh',
      toolTipMessage: 'Refresh record data',
      color: MaterialColor.Basic,
      icon: 'sync',
      disabled: false,
      command: () => this.loadData()
    }
  ];

  constructor(
    public override _snackBar: MatSnackBar,
    public override dialog: MatDialog,
    private store: Store<ProductsState>
  ) {
    super(_snackBar, dialog);
  }

  override ngOnInit(): void {
    console.log('ngOnInit Product Loader...');

    this.isLoaded$.subscribe((isloaded: boolean) => {
      this.loaded = isloaded;
    });

    this.loadData();
  }

  override ngAfterViewInit(): void {
    console.log('ngAfterViewInit Product Loader...');
  }

  override ngOnDestroy(): void {
    console.log('ngOnDestroy Product Loader...');
  }

  private loadData(): void {
    const param = this.route.snapshot.params;
    const btn = this.fnButtons$.find((btn) => btn.id === 'delete');

    if (param['id'] !== '0') {
      // Edit
      this.store.dispatch(initProduct({ selectedId: param['id'] }));
    } else {
      if (btn) btn.disabled = true;

      // Insert
      this.productModel = {
        ProductID: '0',
        ProductName: '',
        SupplierID: '',
        CategoryID: '',
        QuantityPerUnit: 0,
        UnitPrice: 0,
        UnitsInStock: 0,
        UnitsOnOrder: 0,
        ReorderLevel: '',
        Discontinued: false
      };

      this.store.dispatch(
        loadProductSuccess({
          product: this.productModel
        })
      );
    }

    this.product$.subscribe((product: ProductDto) => {
      this.productModel = { ...product };
    });
  }

  private deleteData(): void {
    this.confirmDialog(
      'Delete',
      'Are you sure you want to delete it?'
    ).subscribe((result: boolean) => {
      if (result) {
        this.store.dispatch(
          deleteProduct({ delProduct: this.productModel })
        );
      }
    });
  }

  private saveData(): void {
    const param = this.route.snapshot.params;
    if (param['id'] !== '0') {
      //Edit
      this.store.dispatch(
        putProduct({
          selectedId: this.productModel.ProductID,
          putProduct: this.productModel
        })
      );
    } else {
      // Insert
      this.store.dispatch(
        postProduct({
          newProduct: this.productModel
        })
      );
    }
  }

  public formStatus(frm: NgForm): void {
    console.log('Form is valid: ' + frm.valid);
  }
}

import { selectProductCategories } from './../+state/products.selectors';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import {
  MaterialColor,
  MtToggleButtonGroup
} from '@nx-northwind/nx-material-ui';
import { ProductLoaderDto } from '@nx-northwind/nx-northwind-app/entities';
import { CategoryBrowserComponent } from '@nx-northwind/nx-northwind-app/featured/category';
import {
  BaseLoaderComponent,
  FunctionButtons
} from '@nx-northwind/nx-northwind-app/featured/shared';
import { SupplierBrowserComponent } from '@nx-northwind/nx-northwind-app/featured/supplier';
import { LookupService } from '@nx-northwind/nx-northwind-app/services';
import { of, tap } from 'rxjs';
import {
  deleteProduct,
  initProduct,
  initProductSuppliers,
  loadProductSuccess,
  postProduct,
  putProduct
} from '../+state/products.actions';
import { ProductsState } from '../+state/products.reducer';
import {
  selectProduct,
  selectProductsError,
  selectProductsLoaded,
  selectProductSuppliers
} from '../+state/products.selectors';
import { initProductCategories } from './../+state/products.actions';

@Component({
  selector: 'nx-northwind-product-loader',
  templateUrl: './product-loader.component.html',
  styleUrls: ['./product-loader.component.scss']
})
export class ProductLoaderComponent extends BaseLoaderComponent {
  productModel!: ProductLoaderDto;
  product$ = this.store.select(selectProduct);
  suppliers$ = this.store.select(selectProductSuppliers);
  categories$ = this.store.select(selectProductCategories);
  error$ = this.store.select(selectProductsError);
  isLoaded$ = this.store.select(selectProductsLoaded);
  loaded: boolean = true;

  public boolButtons: MtToggleButtonGroup[] = [
    {
      id: '0',
      label: 'Νο',
      value: '0'
    },
    {
      id: '1',
      label: 'Yes',
      value: '1'
    }
  ];

  public formGroup = this.fb.group({
    Id: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    ProductID: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    ProductName: new FormControl(
      { value: '', disabled: false },
      Validators.required
    ),
    SupplierID: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    Supplier: new FormControl(
      { value: '', disabled: false },
      Validators.required
    ),
    CategoryID: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    Category: new FormControl(
      { value: '', disabled: false },
      Validators.required
    ),
    QuantityPerUnit: new FormControl(
      { value: '', disabled: false },
      Validators.required
    ),
    UnitPrice: new FormControl(
      { value: '', disabled: false },
      Validators.required
    ),
    UnitsInStock: new FormControl(
      { value: '', disabled: false },
      Validators.required
    ),
    UnitsOnOrder: new FormControl(
      { value: '', disabled: false },
      Validators.required
    ),
    ReorderLevel: new FormControl(
      { value: '', disabled: false },
      Validators.required
    ),
    Discontinued: new FormControl(
      { value: '', disabled: false },
      Validators.required
    ),
    CreatedBy: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    CreatedAt: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    UpdatedAt: new FormControl({ value: '', disabled: true })
  });

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
    public override lookupService: LookupService,
    private store: Store<ProductsState>,
    private fb: FormBuilder
  ) {
    super(_snackBar, dialog, lookupService);
  }

  override ngOnInit(): void {
    console.log('ngOnInit Product Loader...');

    this.isLoaded$.subscribe((isloaded: boolean) => {
      this.loaded = isloaded;
    });

    of(null)
      .pipe(
        tap(() => {
          this.store.dispatch(initProductSuppliers());
          this.store.dispatch(initProductCategories());
        })
      )
      .subscribe(() => this.loadData());
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
        LU_Supplier: '',
        CategoryID: '',
        LU_Category: '',
        QuantityPerUnit: 0,
        UnitPrice: 0,
        UnitsInStock: 0,
        UnitsOnOrder: 0,
        ReorderLevel: '',
        Discontinued: 0
      };

      this.store.dispatch(
        loadProductSuccess({
          product: this.productModel
        })
      );
    }

    this.product$.subscribe((product: ProductLoaderDto) => {
      this.productModel = { ...product };

      this.formGroup.patchValue({
        ProductID: this.productModel.ProductID,
        ProductName: this.productModel.ProductName,
        SupplierID: this.productModel.SupplierID,
        Supplier: this.productModel.LU_Supplier,
        CategoryID: this.productModel.CategoryID,
        Category: this.productModel.LU_Category,
        QuantityPerUnit:
          this.productModel.QuantityPerUnit?.toString(),
        UnitPrice: parseFloat(
          this.productModel.UnitPrice?.toString()
        ).toFixed(2),
        UnitsInStock: parseFloat(
          this.productModel.UnitsInStock?.toString()
        ).toFixed(2),
        UnitsOnOrder: parseFloat(
          this.productModel.UnitsOnOrder?.toString()
        ).toFixed(2),
        ReorderLevel: this.productModel.ReorderLevel,
        Discontinued: this.productModel.Discontinued?.toString()
      });
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

  public onFormChange(frm: FormGroupDirective): void {
    const btn = this.fnButtons$.find((btn) => btn.id === 'save');
    if (btn) btn.disabled = !(frm.form.status === 'VALID');
  }

  private lookupValidation(isValid: boolean): void {
    const btn = this.fnButtons$.find((btn) => btn.id === 'save');
    if (btn) btn.disabled = !isValid;
  }

  public suppliersLookup = (args: any): void => {
    if (!args) args = null;

    const data = {
      isDialog: true,
      suppliers: this.suppliers$,
      isLoaded: this.isLoaded$,
      error: this.error$
    };

    this.lookupService
      .openLookup(args, SupplierBrowserComponent, data)
      .afterClosed()
      .subscribe((result: any) => {
        if (result) {
          console.log(result);
          this.productModel.SupplierID = result.Id;
          this.productModel.LU_Supplier = result.CompanyName;
        }
        this.lookupValidation(this.formGroup.valid);
      });
  };

  public categoriesLookup = (args: any): void => {
    if (!args) args = null;

    const data = {
      isDialog: true,
      categories: this.categories$,
      isLoaded: this.isLoaded$,
      error: this.error$
    };

    this.lookupService
      .openLookup(args, CategoryBrowserComponent, data)
      .afterClosed()
      .subscribe((result: any) => {
        if (result) {
          console.log(result);
          this.productModel.CategoryID = result.CategoryID;
          this.productModel.LU_Category = result.CategoryName;
        }
        this.lookupValidation(this.formGroup.valid);
      });
  };
}

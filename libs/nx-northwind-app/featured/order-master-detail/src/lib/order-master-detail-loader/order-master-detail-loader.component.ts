/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  Validators
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { MaterialColor } from '@nx-northwind/nx-material-ui';
import {
  OrderDetailLoaderDto,
  OrderMasterDetailLoaderDto
} from '@nx-northwind/nx-northwind-app/entities';
import {
  BaseMasterDetailLoaderComponent,
  FunctionButtons
} from '@nx-northwind/nx-northwind-app/featured/shared';
import { map } from 'rxjs';
import {
  initOrder,
  initOrderDetailsByOrderId,
  loadOrderDetailsSuccess,
  loadOrderSuccess
} from '../+state/orders-master-detail.actions';
import {
  selectAllOrderDetails,
  selectOrder,
  selectOrderDetailsError,
  selectOrderDetailsLoaded
} from '../+state/orders-master-detail.selectors';
import { OrdersMasterDetailState } from './../+state/orders-master-detail.reducer';

@Component({
  selector: 'nx-northwind-order-master-detail-loader',
  templateUrl: './order-master-detail-loader.component.html',
  styleUrls: ['./order-master-detail-loader.component.scss']
})
export class OrderMasterDetailLoaderComponent extends BaseMasterDetailLoaderComponent {
  orderModel!: OrderMasterDetailLoaderDto;
  orderDetailModel: OrderDetailLoaderDto[] = [];
  order$ = this.store.select(selectOrder);
  ordersDetails$ = this.store.select(selectAllOrderDetails);
  error$ = this.store.select(selectOrderDetailsError);
  isLoaded$ = this.store.select(selectOrderDetailsLoaded);
  loaded: boolean = true;

  @ViewChild('orderDetailForm') orderDetailsForm!: HTMLFormElement;

  public formGroup = this.fb.group({
    OrderID: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    CustomerID: new FormControl(
      { value: '', disabled: false },
      Validators.required
    ),
    EmployeeID: new FormControl(
      { value: '', disabled: false },
      Validators.required
    ),
    OrderDate: new FormControl(
      { value: '', disabled: false },
      Validators.required
    ),
    RequiredDate: new FormControl(
      { value: '', disabled: false },
      Validators.required
    ),
    ShippedDate: new FormControl(
      { value: '', disabled: false },
      Validators.required
    ),
    ShipVia: new FormControl(
      { value: '', disabled: false },
      Validators.required
    ),
    Freight: new FormControl(
      { value: '', disabled: false },
      Validators.required
    ),
    ShipName: new FormControl(
      { value: '', disabled: false },
      Validators.maxLength(40)
    ),
    ShipAddress: new FormControl(
      { value: '', disabled: false },
      Validators.required || Validators.maxLength(60)
    ),
    ShipCity: new FormControl(
      { value: '', disabled: false },
      Validators.required || Validators.maxLength(15)
    ),
    ShipRegion: new FormControl(
      { value: '', disabled: true },
      Validators.maxLength(15)
    ),
    ShipPostalCode: new FormControl(
      { value: '', disabled: true },
      Validators.maxLength(10)
    ),
    ShipCountry: new FormControl(
      { value: '', disabled: true },
      Validators.maxLength(15)
    ),
    orderDetails: this.fb.array([])
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
      disabled: this.formGroup.status !== 'VALID',
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
    private store: Store<OrdersMasterDetailState>,
    private fb: FormBuilder
  ) {
    super(_snackBar, dialog);
  }

  override ngOnInit(): void {
    console.log(
      'ngOnInit OrderMasterDetailLoaderComponent Loader...'
    );

    this.isLoaded$.subscribe((isloaded: boolean) => {
      this.loaded = isloaded;
    });

    this.loadData();
  }

  override ngAfterViewInit(): void {
    console.log(
      'ngAfterViewInit OrderMasterDetailLoaderComponent Loader...'
    );
  }

  override ngOnDestroy(): void {
    console.log(
      'ngOnDestroy OrderMasterDetailLoaderComponent Loader...'
    );
  }

  private loadData(): void {
    const param = this.route.snapshot.params;
    const btn = this.fnButtons$.find((btn) => btn.id === 'delete');

    if (param['id'] !== '0') {
      // Edit
      this.store.dispatch(initOrder({ selectedId: param['id'] }));
      this.store.dispatch(
        initOrderDetailsByOrderId({ selectedOrderId: param['id'] })
      );
    } else {
      if (btn) btn.disabled = true;

      // Insert

      this.orderModel = {
        Id: '0',
        OrderID: '',
        CustomerID: '',
        EmployeeID: '',
        OrderDate: '',
        RequiredDate: '',
        ShippedDate: '',
        ShipVia: '',
        Freight: '',
        ShipName: '',
        ShipAddress: '',
        ShipCity: '',
        ShipRegion: '',
        ShipPostalCode: '',
        ShipCountry: ''
      };

      this.orderDetailModel = [
        {
          Id: '0',
          OrderID: '',
          ProductID: '',
          UnitPrice: 0,
          Quantity: 0,
          Discount: 0
        }
      ];

      this.store.dispatch(
        loadOrderSuccess({
          order: this.orderModel
        })
      );

      this.store.dispatch(
        loadOrderDetailsSuccess({
          orderDetails: this.orderDetailModel
        })
      );
    }

    this.initFormControls(param);
  }

  private initFormControls(param: Params) {
    this.order$.subscribe((order: OrderMasterDetailLoaderDto) => {
      this.orderModel = { ...order };

      this.formGroup.patchValue({
        OrderID: this.orderModel.OrderID,
        CustomerID: this.orderModel.CustomerID || null,
        EmployeeID: this.orderModel.EmployeeID || null,
        OrderDate: this.orderModel.OrderDate || null,
        RequiredDate: this.orderModel.RequiredDate || null,
        ShippedDate: this.orderModel.ShippedDate || null,
        ShipVia: this.orderModel.ShipVia || null,
        Freight: this.orderModel.Freight || null,
        ShipName: this.orderModel.ShipName || null,
        ShipAddress: this.orderModel.ShipAddress || null,
        ShipCity: this.orderModel.ShipCity || null,
        ShipRegion: this.orderModel.ShipRegion || null,
        ShipPostalCode: this.orderModel.ShipPostalCode || null,
        ShipCountry: this.orderModel.ShipCountry || null
      });
    });

    this.ordersDetails$
      .pipe(
        map((data: OrderDetailLoaderDto[]) => {
          if (parseInt(param['id']) > 0) {
            return data.filter(
              (item: OrderDetailLoaderDto) =>
                parseInt(item.OrderID) === parseInt(param['id'])
            );
          } else {
            return data;
          }
        })
      )
      .subscribe((data: OrderDetailLoaderDto[]) => {
        this.orderDetailModel = [];
        this.frmGetOrderDetails.clear();
        data.map((item) => {
          if (param['id'] !== '0') {
            this.orderDetailModel.push({ ...item });
          } else {
            this.orderDetailModel = [{ ...item }];
          }

          this.frmAddOrderDetails(
            this.fb.group({
              OrderID: new FormControl(
                {
                  value: item.OrderID,
                  disabled: true
                },
                Validators.required
              ),
              ProductID: new FormControl(
                {
                  value: item.ProductID,
                  disabled: false
                },
                Validators.required
              ),
              UnitPrice: new FormControl(
                {
                  value: item.UnitPrice,
                  disabled: false
                },
                Validators.required
              ),
              Quantity: new FormControl(
                {
                  value: item.Quantity,
                  disabled: false
                },
                Validators.required
              ),
              Discount: new FormControl(
                {
                  value: item.Discount,
                  disabled: false
                },
                Validators.required
              )
            })
          );
        });
      });
  }

  private deleteData(): void {
    this.confirmDialog(
      'Delete',
      'Are you sure you want to delete it?'
    ).subscribe((result: boolean) => {
      if (result) {
        // this.store.dispatch(
        //   deleteCategory({ delCategory: this.categoryModel })
        // );
      }
    });
  }

  private saveData(): void {
    this.orderDetailsForm.submit;
  }

  get frmGetOrderDetails(): FormArray {
    return this.formGroup.get('orderDetails') as FormArray;
  }

  frmAddOrderDetails(detail: any) {
    this.frmGetOrderDetails.push(detail);
  }

  public onFormSubmit(frm: FormGroupDirective): void {
    console.log('Submitted...');
    console.log('Form is valid: ' + frm.valid);
    console.log(this.formGroup.value);
  }

  public onFormChange(frm: FormGroupDirective): void {
    const btn = this.fnButtons$.find((btn) => btn.id === 'save');
    if (btn) btn.disabled = !(frm.form.status === 'VALID');
  }
}

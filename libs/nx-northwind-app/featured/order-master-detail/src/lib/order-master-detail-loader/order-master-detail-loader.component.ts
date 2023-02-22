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
import {
  MaterialColor,
  MtSelectItem
} from '@nx-northwind/nx-material-ui';
import {
  CustomerLoaderDto,
  EmployeeLoaderDto,
  OrderDetailLoaderDto,
  OrderMasterDetailLoaderDto,
  ProductLoaderDto,
  ShipperLoaderDto
} from '@nx-northwind/nx-northwind-app/entities';
import { CustomerBrowserComponent } from '@nx-northwind/nx-northwind-app/featured/customer';
import { EmployeeBrowserComponent } from '@nx-northwind/nx-northwind-app/featured/employee';
import { ProductBrowserComponent } from '@nx-northwind/nx-northwind-app/featured/product';
import {
  BaseMasterDetailLoaderComponent,
  FunctionButtons
} from '@nx-northwind/nx-northwind-app/featured/shared';
import { ShipperBrowserComponent } from '@nx-northwind/nx-northwind-app/featured/shipper';
import { LookupService } from '@nx-northwind/nx-northwind-app/services';
import { map, of, tap } from 'rxjs';
import {
  deleteOrder,
  initOrder,
  initOrderDetailCustomers,
  initOrderDetailEmployees,
  initOrderDetailsByOrderId,
  initOrderDetailShippers,
  loadOrderDetailsSuccess,
  loadOrderSuccess,
  postOrderDetail,
  putOrder,
  putOrderDetail
} from '../+state/orders-master-detail.actions';
import {
  selectAllOrderDetails,
  selectOrder,
  selectOrderDetailsError,
  selectOrderDetailsLoaded
} from '../+state/orders-master-detail.selectors';
import {
  deleteOrderDetail,
  initOrderDetailProducts,
  postOrder
} from './../+state/orders-master-detail.actions';
import { OrdersMasterDetailState } from './../+state/orders-master-detail.reducer';
import {
  selectAllOrderCustomers,
  selectAllOrderEmployees,
  selectAllOrderProducts,
  selectAllOrderShippers
} from './../+state/orders-master-detail.selectors';

@Component({
  selector: 'nx-northwind-order-master-detail-loader',
  templateUrl: './order-master-detail-loader.component.html',
  styleUrls: ['./order-master-detail-loader.component.scss']
})
export class OrderMasterDetailLoaderComponent extends BaseMasterDetailLoaderComponent {
  orderDetailvCnt: number = 0;
  orderModel!: OrderMasterDetailLoaderDto;
  orderDetailModel: OrderDetailLoaderDto[] = [];
  orderDetailIdsForDelete: OrderDetailLoaderDto[] = [];
  employeesComboData: MtSelectItem[] = [];
  customersComboData: MtSelectItem[] = [];
  shippersComboData: MtSelectItem[] = [];
  productsComboData: MtSelectItem[] = [];

  order$ = this.store.select(selectOrder);
  ordersDetails$ = this.store.select(selectAllOrderDetails);
  employees$ = this.store.select(selectAllOrderEmployees);
  customers$ = this.store.select(selectAllOrderCustomers);
  shippers$ = this.store.select(selectAllOrderShippers);
  products$ = this.store.select(selectAllOrderProducts);

  error$ = this.store.select(selectOrderDetailsError);
  isLoaded$ = this.store.select(selectOrderDetailsLoaded);

  loaded: boolean = true;
  orderSubTotal?: string = '';
  orderTotal?: string = '';

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
    Customer: new FormControl(
      { value: '', disabled: false },
      Validators.required
    ),
    EmployeeID: new FormControl(
      { value: '', disabled: false },
      Validators.required
    ),
    Employee: new FormControl(
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
    Shipper: new FormControl(
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

  orderDetailBtns$: FunctionButtons[] = [
    {
      id: 'delete',
      label: 'Delete',
      toolTipMessage: 'Delete current product',
      color: MaterialColor.Basic,
      icon: 'delete',
      disabled: false,
      command: (ev: string) => {
        console.log(ev);
      }
    }
  ];

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
      command: () => this.deleteOrder()
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
    public override lookupService: LookupService,
    private store: Store<OrdersMasterDetailState>,
    private fb: FormBuilder
  ) {
    super(_snackBar, dialog, lookupService);
  }

  override ngOnInit(): void {
    console.log(
      'ngOnInit OrderMasterDetailLoaderComponent Loader...'
    );

    this.isLoaded$.subscribe((isloaded: boolean) => {
      this.loaded = isloaded;
    });

    of(null)
      .pipe(
        tap(() => {
          this.store.dispatch(initOrderDetailCustomers());
          this.store.dispatch(initOrderDetailEmployees());
          this.store.dispatch(initOrderDetailShippers());
          this.store.dispatch(initOrderDetailProducts());
        })
      )
      .subscribe(() => this.loadData());
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

    this.initComboBoxes();

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
        LU_Customer: '',
        EmployeeID: '',
        LU_Employee: '',
        OrderDate: '',
        RequiredDate: '',
        ShippedDate: '',
        ShipVia: '',
        LU_Shipper: '',
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
          Id: this.orderDetailvCnt.toString(),
          OrderID: '',
          ProductID: '',
          LU_Product: '',
          UnitPrice: 0,
          Quantity: 0,
          Discount: 0,
          SubTotal: '0',
          Total: '0'
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

  private initComboBoxes() {
    this.employees$.subscribe((data: EmployeeLoaderDto[]) => {
      this.employeesComboData = [];
      data.map((employee: EmployeeLoaderDto) => {
        this.employeesComboData.push({
          id: employee.EmployeeID,
          label: employee.LastName + ' ' + employee.FirstName,
          value: employee.EmployeeID,
          disabled: false
        });
      });
    });

    // fill customers combo
    this.customers$.subscribe((data: CustomerLoaderDto[]) => {
      this.customersComboData = [];
      data.map((customer: CustomerLoaderDto) => {
        this.customersComboData.push({
          id: customer.CustomerID,
          label: customer.CompanyName,
          value: customer.CustomerID,
          disabled: false
        });
      });
    });

    // fill shippers combo
    this.shippers$.subscribe((data: ShipperLoaderDto[]) => {
      this.shippersComboData = [];
      data.map((shipper: ShipperLoaderDto) => {
        this.shippersComboData.push({
          id: shipper.ShipperID,
          label: shipper.CompanyName,
          value: shipper.ShipperID,
          disabled: false
        });
      });
    });

    // fill products combo
    this.products$.subscribe((data: ProductLoaderDto[]) => {
      this.productsComboData = [];
      data.map((product: ProductLoaderDto) => {
        this.productsComboData.push({
          id: product.ProductID,
          label: product.ProductName,
          value: product.ProductID,
          disabled: false
        });
      });
    });
  }

  private initFormControls(param: Params) {
    this.orderDetailIdsForDelete = [];

    this.order$.subscribe((order: OrderMasterDetailLoaderDto) => {
      this.orderModel = { ...order };

      this.formGroup.patchValue({
        OrderID: this.orderModel.OrderID,
        CustomerID: this.orderModel.CustomerID || null,
        Customer: this.orderModel.LU_Customer || null,
        EmployeeID: this.orderModel.EmployeeID || null,
        Employee: this.orderModel.LU_Employee || null,
        OrderDate: this.orderModel.OrderDate || null,
        RequiredDate: this.orderModel.RequiredDate || null,
        ShippedDate: this.orderModel.ShippedDate || null,
        ShipVia: this.orderModel.ShipVia || null,
        Shipper: this.orderModel.LU_Shipper || null,
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
        data.map((item: OrderDetailLoaderDto) => {
          this.orderDetailModel.push({ ...item });

          this.calculateSubTotals();

          this.frmAddOrderDetails(
            this.fb.group({
              Id: new FormControl(
                {
                  value: item.Id,
                  disabled: true
                },
                Validators.required
              ),
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
              Product: new FormControl(
                {
                  value: item.LU_Product,
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
              ),
              SubTotal: new FormControl(
                {
                  value: item.SubTotal,
                  disabled: true
                },
                Validators.required
              ),
              Total: new FormControl(
                {
                  value: item.Total,
                  disabled: true
                },
                Validators.required
              )
            })
          );
        });
      });
  }

  private deleteOrder(): void {
    this.confirmDialog(
      'Delete',
      'Are you sure you want to delete it?'
    ).subscribe((result: boolean) => {
      if (result) {
        // delete order details
        this.orderDetailModel.map((order: OrderDetailLoaderDto) => {
          console.log(order);
          this.store.dispatch(
            deleteOrderDetail({
              delOrderDetail: order
            })
          );
        });

        // delete order
        this.store.dispatch(
          deleteOrder({ delOrder: this.orderModel })
        );
      }
    });
  }

  public deleteOrderDetail = (index: string): any => {
    console.log('Delete: ' + index);
    this.confirmDialog(
      'Delete',
      'Are you sure you want to delete it?'
    ).subscribe((result: boolean) => {
      if (result) {
        this.frmRemoveOrderDetail(index);
      }
    });
  };

  public insertOrderDetail = (): void => {
    this.orderDetailvCnt -= 1;

    this.frmAddOrderDetails(
      this.fb.group({
        Id: new FormControl(
          {
            value: '0',
            disabled: true
          },
          Validators.required
        ),
        OrderID: new FormControl(
          {
            value: '0',
            disabled: true
          },
          Validators.required
        ),
        ProductID: new FormControl(
          {
            value: '',
            disabled: false
          },
          Validators.required
        ),
        UnitPrice: new FormControl(
          {
            value: 0,
            disabled: false
          },
          Validators.required
        ),
        Quantity: new FormControl(
          {
            value: 0,
            disabled: false
          },
          Validators.required
        ),
        Discount: new FormControl(
          {
            value: 0,
            disabled: false
          },
          Validators.required
        ),
        SubTotal: new FormControl(
          {
            value: '0',
            disabled: true
          },
          Validators.required
        ),
        Total: new FormControl(
          {
            value: '0',
            disabled: true
          },
          Validators.required
        )
      })
    );

    this.orderDetailModel.push({
      Id: this.orderDetailvCnt.toString(),
      OrderID: this.orderModel.OrderID || '0',
      ProductID: '',
      UnitPrice: 0,
      Quantity: 0,
      Discount: 0,
      SubTotal: '0',
      Total: '0'
    });

    this.store.dispatch(
      loadOrderDetailsSuccess({
        orderDetails: this.orderDetailModel
      })
    );
  };

  private saveData(): void {
    // console.log(this.formGroup);

    const param = this.route.snapshot.params;

    // ##### Order ##### //
    if (param['id'] !== '0') {
      //Edit
      this.store.dispatch(
        putOrder({
          selectedId: this.orderModel.OrderID,
          putOrder: this.orderModel
        })
      );
    } else {
      // Insert
      this.store.dispatch(
        postOrder({
          newOrder: this.orderModel
        })
      );
    }

    // ##### Order Details ##### //
    // delete
    if (param['id'] !== '0') {
      if (this.orderDetailIdsForDelete.length > 0) {
        this.orderDetailIdsForDelete.map(
          (order: OrderDetailLoaderDto) => {
            console.log(order);
            this.store.dispatch(
              deleteOrderDetail({
                delOrderDetail: order
              })
            );
          }
        );
      }
    }

    // update
    if (param['id'] !== '0') {
      this.orderDetailModel.map((order: OrderDetailLoaderDto) => {
        if (order.Id) {
          if (parseInt(order.Id) > 0) {
            this.store.dispatch(
              putOrderDetail({
                selectedId: order.Id,
                putOrderDetail: order
              })
            );
          }
        }
      });
    }

    // insert
    this.orderDetailModel.map((order: OrderDetailLoaderDto) => {
      if (order.Id) {
        if (parseInt(order.Id) <= 0) {
          this.store.dispatch(
            postOrderDetail({
              newOrderDetail: order
            })
          );
        }
      }
    });
  }

  private frmAddOrderDetails(detail: any): void {
    this.frmGetOrderDetails.push(detail);
  }

  private frmRemoveOrderDetail(rowIndex: string): void {
    const args = rowIndex.split('|');
    const indx: number = parseInt(args[0]);
    const detailId: number = parseInt(args[1]);

    // gather detail id to be deleted
    const ord = this.orderDetailModel.find(
      (orderDetail: OrderDetailLoaderDto) => {
        if (orderDetail.Id !== undefined) {
          return parseInt(orderDetail.Id) === detailId;
        }
        return null;
      }
    );

    if (ord) this.orderDetailIdsForDelete.push(ord);

    this.frmGetOrderDetails.removeAt(indx);
    this.orderDetailModel.splice(indx, 1);
    this.store.dispatch(
      loadOrderDetailsSuccess({
        orderDetails: this.orderDetailModel
      })
    );

    // console.log(this.orderDetailIdsForDelete);
  }

  public onFormChange(frm: FormGroupDirective): void {
    const btn = this.fnButtons$.find((btn) => btn.id === 'save');
    if (btn) btn.disabled = !(frm.form.status === 'VALID');
    this.calculateSubTotals();
  }

  private calculateSubTotals(): void {
    let orderSubTotalTmp: number = 0;
    let orderTotalTmp: number = 0;

    this.orderDetailModel.map((res: OrderDetailLoaderDto) => {
      if (
        res.UnitPrice !== undefined &&
        res.Quantity !== undefined &&
        res.Discount !== undefined
      ) {
        // subtotals - totals per product
        const subTotalTemp: number = res.UnitPrice * res.Quantity;
        const totalTemp: number =
          res.UnitPrice * res.Quantity -
          res.UnitPrice * res.Quantity * (res.Discount / 100);

        res.SubTotal =
          parseFloat(subTotalTemp.toString()).toFixed(2) + '€';
        res.Total = parseFloat(totalTemp.toString()).toFixed(2) + '€';

        // subtotals - totals
        orderSubTotalTmp = orderSubTotalTmp + subTotalTemp;
        orderTotalTmp = orderTotalTmp + totalTemp;
        this.orderSubTotal =
          parseFloat(orderSubTotalTmp.toString()).toFixed(2) + '€';
        this.orderTotal =
          parseFloat(orderTotalTmp.toString()).toFixed(2) + '€';
      }
    });
  }

  get frmGetOrderDetails(): FormArray {
    return this.formGroup.get('orderDetails') as FormArray;
  }

  public shippersLookup = (args: any): void => {
    if (!args) args = null;

    const data = {
      isDialog: true,
      shippers: this.shippers$,
      isLoaded: this.isLoaded$,
      error: this.error$
    };

    this.lookupService
      .openLookup(args, ShipperBrowserComponent, data)
      .afterClosed()
      .subscribe((result: any) => {
        if (result) {
          this.orderModel.ShipVia = result.ShipperID;
          this.orderModel.LU_Shipper = result.CompanyName;
        }
      });
  };

  public employeesLookup = (args: any): void => {
    if (!args) args = null;

    const data = {
      isDialog: true,
      employees: this.employees$,
      isLoaded: this.isLoaded$,
      error: this.error$
    };

    this.lookupService
      .openLookup(args, EmployeeBrowserComponent, data)
      .afterClosed()
      .subscribe((result: any) => {
        if (result) {
          this.orderModel.EmployeeID = result.EmployeeID;
          this.orderModel.LU_Employee = `${result.LastName} ${result.FirstName}`;
        }
      });
  };

  public customersLookup = (args: any): void => {
    if (!args) args = null;

    const data = {
      isDialog: true,
      customers: this.customers$,
      isLoaded: this.isLoaded$,
      error: this.error$
    };

    this.lookupService
      .openLookup(args, CustomerBrowserComponent, data)
      .afterClosed()
      .subscribe((result: any) => {
        if (result) {
          this.orderModel.CustomerID = result.CustomerID;
          this.orderModel.LU_Customer = result.CompanyName;
        }
      });
  };

  public productsLookup = (args: any): void => {
    if (!args) args = null;

    const orderDetailIndex: number = parseInt(
      (args as string).replace('Product_', '')
    );

    const data = {
      isDialog: true,
      products: this.products$,
      isLoaded: this.isLoaded$,
      error: this.error$
    };

    this.lookupService
      .openLookup(args, ProductBrowserComponent, data)
      .afterClosed()
      .subscribe((result: any) => {
        if (result) {
          this.orderDetailModel[orderDetailIndex].ProductID =
            result.ProductID;
          this.orderDetailModel[orderDetailIndex].LU_Product =
            result.ProductName;
        }
      });
  };
}

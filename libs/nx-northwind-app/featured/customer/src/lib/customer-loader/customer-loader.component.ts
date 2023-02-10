/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { MaterialColor } from '@nx-northwind/nx-material-ui';
import { CustomerLoaderDto } from '@nx-northwind/nx-northwind-app/entities';
import {
  BaseLoaderComponent,
  FunctionButtons
} from '@nx-northwind/nx-northwind-app/featured/shared';
import {
  deleteCustomer,
  initCustomer,
  loadCustomerSuccess,
  postCustomer,
  putCustomer
} from '../+state/customers.actions';
import { CustomersState } from '../+state/customers.reducer';
import {
  selectCustomer,
  selectCustomersError,
  selectCustomersLoaded
} from '../+state/customers.selectors';

@Component({
  selector: 'nx-northwind-customer-loader',
  templateUrl: './customer-loader.component.html',
  styleUrls: ['./customer-loader.component.scss']
})
export class CustomerLoaderComponent extends BaseLoaderComponent {
  customerModel!: CustomerLoaderDto;
  customer$ = this.store.select(selectCustomer);
  error$ = this.store.select(selectCustomersError);
  isLoaded$ = this.store.select(selectCustomersLoaded);
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
    private store: Store<CustomersState>
  ) {
    super(_snackBar, dialog);
  }

  override ngOnInit(): void {
    console.log('ngOnInit Customer Loader...');

    this.isLoaded$.subscribe((isloaded: boolean) => {
      this.loaded = isloaded;
    });

    this.loadData();
  }

  override ngAfterViewInit(): void {
    console.log('ngAfterViewInit Customer Loader...');
  }

  override ngOnDestroy(): void {
    console.log('ngOnDestroy Customer Loader...');
  }

  private loadData(): void {
    const param = this.route.snapshot.params;
    const btn = this.fnButtons$.find((btn) => btn.id === 'delete');

    if (param['id'] !== '0') {
      // Edit
      this.store.dispatch(initCustomer({ selectedId: param['id'] }));
    } else {
      if (btn) btn.disabled = true;

      // Insert
      this.customerModel = {
        CustomerID: '0',
        CompanyName: '',
        ContactName: '',
        ContactTitle: '',
        Address: '',
        City: '',
        Region: '',
        PostalCode: '',
        Country: '',
        Phone: '',
        Fax: ''
      };

      this.store.dispatch(
        loadCustomerSuccess({
          customer: this.customerModel
        })
      );
    }

    this.customer$.subscribe((customer: CustomerLoaderDto) => {
      this.customerModel = { ...customer };
    });
  }

  private deleteData(): void {
    this.confirmDialog(
      'Delete',
      'Are you sure you want to delete it?'
    ).subscribe((result: boolean) => {
      if (result) {
        this.store.dispatch(
          deleteCustomer({ delCustomer: this.customerModel })
        );
      }
    });
  }

  private saveData(): void {
    const param = this.route.snapshot.params;
    if (param['id'] !== '0') {
      //Edit
      console.log('Update...');
      this.store.dispatch(
        putCustomer({
          selectedId: this.customerModel.CustomerID,
          putCustomer: this.customerModel
        })
      );
    } else {
      // Insert
      console.log('Insert...');
      this.store.dispatch(
        postCustomer({
          newCustomer: this.customerModel
        })
      );
    }
  }

  public formStatus(frm: NgForm): void {
    console.log('Form is valid: ' + frm.valid);
  }
}

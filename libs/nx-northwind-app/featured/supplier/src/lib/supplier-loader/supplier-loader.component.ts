/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { MaterialColor } from '@nx-northwind/nx-material-ui';
import { SupplierLoaderDto } from '@nx-northwind/nx-northwind-app/entities';
import {
  BaseLoaderComponent,
  FunctionButtons
} from '@nx-northwind/nx-northwind-app/featured/shared';
import { LookupService } from '@nx-northwind/nx-northwind-app/services';
import {
  initSupplier,
  loadSupplierSuccess,
  deleteSupplier,
  putSupplier,
  postSupplier
} from '../+state/suppliers.actions';
import { SuppliersState } from '../+state/suppliers.reducer';
import {
  selectSupplier,
  selectSuppliersError,
  selectSuppliersLoaded
} from '../+state/suppliers.selectors';

@Component({
  selector: 'nx-northwind-supplier-loader',
  templateUrl: './supplier-loader.component.html',
  styleUrls: ['./supplier-loader.component.scss']
})
export class SupplierLoaderComponent extends BaseLoaderComponent {
  supplierModel!: SupplierLoaderDto;
  supplier$ = this.store.select(selectSupplier);
  error$ = this.store.select(selectSuppliersError);
  isLoaded$ = this.store.select(selectSuppliersLoaded);
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
    public override lookupService: LookupService,
    private store: Store<SuppliersState>
  ) {
    super(_snackBar, dialog, lookupService);
  }

  override ngOnInit(): void {
    console.log('ngAOnInit Supplier Loader...');

    this.isLoaded$.subscribe((isloaded: boolean) => {
      this.loaded = isloaded;
    });

    this.loadData();
  }

  override ngAfterViewInit(): void {
    console.log('ngAfterViewInit Supplier Loader...');
  }

  override ngOnDestroy(): void {
    console.log('ngOnDestroy Supplier Loader...');
  }

  private loadData(): void {
    const param = this.route.snapshot.params;
    const btn = this.fnButtons$.find((btn) => btn.id === 'delete');

    if (param['id'] !== '0') {
      // Edit
      this.store.dispatch(initSupplier({ selectedId: param['id'] }));
    } else {
      if (btn) btn.disabled = true;

      // Insert
      this.supplierModel = {
        Id: '0',
        CompanyName: '',
        ContactName: '',
        ContactTitle: '',
        Address: '',
        City: '',
        Region: '',
        PostalCode: '',
        Country: '',
        Phone: '',
        Fax: '',
        HomePage: ''
      };

      this.store.dispatch(
        loadSupplierSuccess({
          supplier: this.supplierModel
        })
      );
    }

    this.supplier$.subscribe((supplier: SupplierLoaderDto) => {
      this.supplierModel = { ...supplier };
    });
  }

  private deleteData(): void {
    this.confirmDialog(
      'Delete',
      'Are you sure you want to delete it?'
    ).subscribe((result: boolean) => {
      if (result) {
        this.store.dispatch(
          deleteSupplier({ delSupplier: this.supplierModel })
        );
      }
    });
  }

  private saveData(): void {
    const param = this.route.snapshot.params;
    if (param['id'] !== '0') {
      //Edit
      this.store.dispatch(
        putSupplier({
          selectedId: this.supplierModel.Id,
          putSupplier: this.supplierModel
        })
      );
    } else {
      // Insert
      this.store.dispatch(
        postSupplier({
          newSupplier: this.supplierModel
        })
      );
    }
  }

  public formStatus(frm: NgForm): void {
    console.log('Form is valid: ' + frm.valid);
  }
}

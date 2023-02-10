/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { MaterialColor } from '@nx-northwind/nx-material-ui';
import { ShipperLoaderDto } from '@nx-northwind/nx-northwind-app/entities';
import {
  BaseLoaderComponent,
  FunctionButtons
} from '@nx-northwind/nx-northwind-app/featured/shared';
import {
  deleteShipper,
  initShipper,
  loadShipperSuccess,
  postShipper,
  putShipper
} from '../+state/shippers.actions';
import { ShippersState } from '../+state/shippers.reducer';
import {
  selectShipper,
  selectShippersError,
  selectShippersLoaded
} from '../+state/shippers.selectors';

@Component({
  selector: 'nx-northwind-shipper-loader',
  templateUrl: './shipper-loader.component.html',
  styleUrls: ['./shipper-loader.component.scss']
})
export class ShipperLoaderComponent extends BaseLoaderComponent {
  shipperModel!: ShipperLoaderDto;
  shipper$ = this.store.select(selectShipper);
  error$ = this.store.select(selectShippersError);
  isLoaded$ = this.store.select(selectShippersLoaded);
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
    private store: Store<ShippersState>
  ) {
    super(_snackBar, dialog);
  }

  override ngOnInit(): void {
    console.log('ngOnInit Shipper Loader...');

    this.isLoaded$.subscribe((isloaded: boolean) => {
      this.loaded = isloaded;
    });

    this.loadData();
  }

  override ngAfterViewInit(): void {
    console.log('ngAfterViewInit Shipper Loader...');
  }

  override ngOnDestroy(): void {
    console.log('ngOnDestroy Shipper Loader...');
  }

  private loadData(): void {
    const param = this.route.snapshot.params;
    const btn = this.fnButtons$.find((btn) => btn.id === 'delete');

    if (param['id'] !== '0') {
      // Edit
      this.store.dispatch(initShipper({ selectedId: param['id'] }));
    } else {
      if (btn) btn.disabled = true;

      // Insert
      this.shipperModel = {
        ShipperID: '0',
        CompanyName: '',
        Phone: ''
      };

      this.store.dispatch(
        loadShipperSuccess({
          shipper: this.shipperModel
        })
      );
    }

    this.shipper$.subscribe((shipper: ShipperLoaderDto) => {
      this.shipperModel = { ...shipper };
    });
  }

  private deleteData(): void {
    this.confirmDialog(
      'Delete',
      'Are you sure you want to delete it?'
    ).subscribe((result: boolean) => {
      if (result) {
        this.store.dispatch(
          deleteShipper({ delShipper: this.shipperModel })
        );
      }
    });
  }

  private saveData(): void {
    const param = this.route.snapshot.params;
    if (param['id'] !== '0') {
      //Edit
      this.store.dispatch(
        putShipper({
          selectedId: this.shipperModel.ShipperID,
          putShipper: this.shipperModel
        })
      );
    } else {
      // Insert
      this.store.dispatch(
        postShipper({
          newShipper: this.shipperModel
        })
      );
    }
  }

  public formStatus(frm: NgForm): void {
    console.log('Form is valid: ' + frm.valid);
  }
}

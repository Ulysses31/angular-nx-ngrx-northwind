/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { MaterialColor } from '@nx-northwind/nx-material-ui';
import { RegionLoaderDto } from '@nx-northwind/nx-northwind-app/entities';
import {
  BaseLoaderComponent,
  FunctionButtons
} from '@nx-northwind/nx-northwind-app/featured/shared';
import {
  deleteRegion,
  initRegion,
  loadRegionSuccess,
  postRegion,
  putRegion
} from '../+state/regions.actions';
import { RegionsState } from '../+state/regions.reducer';
import {
  selectRegion,
  selectRegionsError,
  selectRegionsLoaded
} from '../+state/regions.selectors';

@Component({
  selector: 'nx-northwind-region-loader',
  templateUrl: './region-loader.component.html',
  styleUrls: ['./region-loader.component.scss']
})
export class RegionLoaderComponent extends BaseLoaderComponent {
  regionModel!: RegionLoaderDto;
  region$ = this.store.select(selectRegion);
  error$ = this.store.select(selectRegionsError);
  isLoaded$ = this.store.select(selectRegionsLoaded);
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
    private store: Store<RegionsState>
  ) {
    super(_snackBar, dialog);
  }

  override ngOnInit(): void {
    console.log('ngOnInit Region Loader...');

    this.isLoaded$.subscribe((isloaded: boolean) => {
      this.loaded = isloaded;
    });

    this.loadData();
  }

  override ngAfterViewInit(): void {
    console.log('ngAfterViewInit Region Loader...');
  }

  override ngOnDestroy(): void {
    console.log('ngOnDestroy Region Loader...');
  }

  private loadData(): void {
    const param = this.route.snapshot.params;
    const btn = this.fnButtons$.find((btn) => btn.id === 'delete');

    if (param['id'] !== '0') {
      // Edit
      this.store.dispatch(initRegion({ selectedId: param['id'] }));
    } else {
      if (btn) btn.disabled = true;

      // Insert
      this.regionModel = {
        RegionID: '0',
        RegionDescription: ''
      };

      this.store.dispatch(
        loadRegionSuccess({
          region: this.regionModel
        })
      );
    }

    this.region$.subscribe((region: RegionLoaderDto) => {
      this.regionModel = { ...region };
    });
  }

  private deleteData(): void {
    this.confirmDialog(
      'Delete',
      'Are you sure you want to delete it?'
    ).subscribe((result: boolean) => {
      if (result) {
        this.store.dispatch(
          deleteRegion({ delRegion: this.regionModel })
        );
      }
    });
  }

  private saveData(): void {
    const param = this.route.snapshot.params;
    if (param['id'] !== '0') {
      //Edit
      this.store.dispatch(
        putRegion({
          selectedId: this.regionModel.RegionID,
          putRegion: this.regionModel
        })
      );
    } else {
      // Insert
      this.store.dispatch(
        postRegion({
          newRegion: this.regionModel
        })
      );
    }
  }

  public formStatus(frm: NgForm): void {
    console.log('Form is valid: ' + frm.valid);
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { MaterialColor } from '@nx-northwind/nx-material-ui';
import { TerritoryLoaderDto } from '@nx-northwind/nx-northwind-app/entities';
import {
  BaseLoaderComponent,
  FunctionButtons
} from '@nx-northwind/nx-northwind-app/featured/shared';
import { LookupService } from '@nx-northwind/nx-northwind-app/services';
import {
  deleteTerritory,
  initTerritory,
  loadTerritorySuccess,
  postTerritory,
  putTerritory
} from '../+state/territories.actions';
import { TerritoriesState } from '../+state/territories.reducer';
import {
  selectTerritoriesError,
  selectTerritoriesLoaded,
  selectTerritory
} from '../+state/territories.selectors';

@Component({
  selector: 'nx-northwind-territory-loader',
  templateUrl: './territory-loader.component.html',
  styleUrls: ['./territory-loader.component.scss']
})
export class TerritoryLoaderComponent extends BaseLoaderComponent {
  territoryModel!: TerritoryLoaderDto;
  territory$ = this.store.select(selectTerritory);
  error$ = this.store.select(selectTerritoriesError);
  isLoaded$ = this.store.select(selectTerritoriesLoaded);
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
    public dialogRef: MatDialogRef<TerritoryLoaderComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      isDialog: boolean;
      territories: any;
      isLoaded: any;
      error: any;
    },
    private store: Store<TerritoriesState>
  ) {
    super(_snackBar, dialog, lookupService);
  }

  override ngOnInit(): void {
    console.log('ngOnInit Territory Loader...');

    this.isLoaded$.subscribe((isloaded: boolean) => {
      this.loaded = isloaded;
    });

    this.loadData();
  }

  override ngAfterViewInit(): void {
    console.log('ngAfterViewInit Territory Loader...');
  }

  override ngOnDestroy(): void {
    console.log('ngOnDestroy Territory Loader...');
  }

  private loadData(): void {
    const param = this.route.snapshot.params;
    const btn = this.fnButtons$.find((btn) => btn.id === 'delete');

    if (param['id'] !== '0') {
      // Edit
      this.store.dispatch(initTerritory({ selectedId: param['id'] }));
    } else {
      if (btn) btn.disabled = true;

      // Insert
      this.territoryModel = {
        Id: '0',
        TerritoryID: '',
        TerritoryDescription: '',
        RegionID: ''
      };

      this.store.dispatch(
        loadTerritorySuccess({
          territory: this.territoryModel
        })
      );
    }

    this.territory$.subscribe((territory: TerritoryLoaderDto) => {
      this.territoryModel = { ...territory };
    });
  }

  private deleteData(): void {
    this.confirmDialog(
      'Delete',
      'Are you sure you want to delete it?'
    ).subscribe((result: boolean) => {
      if (result) {
        this.store.dispatch(
          deleteTerritory({ delTerritory: this.territoryModel })
        );
      }
    });
  }

  private saveData(): void {
    const param = this.route.snapshot.params;
    if (param['id'] !== '0') {
      //Edit
      this.store.dispatch(
        putTerritory({
          selectedId: this.territoryModel.TerritoryID,
          putTerritory: this.territoryModel
        })
      );
    } else {
      // Insert
      this.store.dispatch(
        postTerritory({
          newTerritory: this.territoryModel
        })
      );
    }
  }

  public formStatus(frm: NgForm): void {
    console.log('Form is valid: ' + frm.valid);
  }
}

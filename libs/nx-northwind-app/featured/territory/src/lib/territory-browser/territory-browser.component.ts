/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { MaterialColor } from '@nx-northwind/nx-material-ui';
import {
  BaseBrowserComponent,
  FunctionButtons
} from '@nx-northwind/nx-northwind-app/featured/shared';
import { initTerritories } from '../+state/territories.actions';
import { TerritoriesState } from '../+state/territories.reducer';
import {
  selectAllTerritories,
  selectTerritoriesError,
  selectTerritoriesLoaded
} from '../+state/territories.selectors';

@Component({
  selector: 'nx-northwind-territory-browser',
  templateUrl: './territory-browser.component.html',
  styleUrls: ['./territory-browser.component.scss']
})
export class TerritoryBrowserComponent extends BaseBrowserComponent {
  territories$ = this.store.select(selectAllTerritories);
  error$ = this.store.select(selectTerritoriesError);
  isLoaded$ = this.store.select(selectTerritoriesLoaded);
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
    public dialogRef: MatDialogRef<TerritoryBrowserComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      isDialog: boolean;
      territories: any;
      isLoaded: any;
      error: any;
    },
    private store: Store<TerritoriesState>
  ) {
    super(_snackBar, dialog);
    console.log('constructor Territory Browser...');
  }

  override ngOnInit(): void {
    console.log('ngOnInit Territory Browser...');

    if (this.data.isDialog) {
      this.error$ = this.data.error;
      this.isLoaded$ = this.data.isLoaded;
      this.territories$ = this.data.territories;
    }

    this.isLoaded$.subscribe((isloaded: boolean) => {
      this.loaded = isloaded;
    });

    this.browseData();
  }

  override ngAfterViewInit(): void {
    console.log('ngAfterViewInit Territory Browser...');
  }

  override ngOnDestroy(): void {
    console.log('ngOnDestroy Territory Browser...');
  }

  private browseData(): void {
    this.store.dispatch(initTerritories());
  }
}

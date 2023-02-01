/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { MaterialColor } from '@nx-northwind/nx-material-ui';
import {
  BaseBrowserComponent,
  FunctionButtons
} from '@nx-northwind/nx-northwind-app/featured/shared';
import { initRegions } from '../+state/regions.actions';
import { RegionsState } from '../+state/regions.reducer';
import {
  selectAllRegions,
  selectRegionsError,
  selectRegionsLoaded
} from '../+state/regions.selectors';

@Component({
  selector: 'nx-northwind-region-browser',
  templateUrl: './region-browser.component.html',
  styleUrls: ['./region-browser.component.scss']
})
export class RegionBrowserComponent extends BaseBrowserComponent {
  regions$ = this.store.select(selectAllRegions);
  error$ = this.store.select(selectRegionsError);
  isLoaded$ = this.store.select(selectRegionsLoaded);
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
    private store: Store<RegionsState>
  ) {
    super(_snackBar, dialog);
    console.log('constructor Region Browser...');
  }

  override ngOnInit(): void {
    console.log('ngOnInit Region Browser...');

    this.isLoaded$.subscribe((isloaded: boolean) => {
      this.loaded = isloaded;
    });

    this.browseData();
  }

  override ngAfterViewInit(): void {
    console.log('ngAfterViewInit Region Browser...');
  }

  override ngOnDestroy(): void {
    console.log('ngOnDestroy Region Browser...');
  }

  private browseData(): void {
    this.store.dispatch(initRegions());
  }
}

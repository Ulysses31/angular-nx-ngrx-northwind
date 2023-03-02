/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject } from '@angular/core';
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
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
import { initCategories } from '../+state/categories.actions';
import { CategoriesState } from '../+state/categories.reducer';
import {
  selectAllCategories,
  selectCategoriesError,
  selectCategoriesLoaded
} from './../+state/categories.selectors';

@Component({
  selector: 'nx-northwind-category-browser',
  templateUrl: './category-browser.component.html',
  styleUrls: ['./category-browser.component.scss']
})
export class CategoryBrowserComponent extends BaseBrowserComponent {
  categories$ = this.store.select(selectAllCategories);
  error$ = this.store.select(selectCategoriesError);
  isLoaded$ = this.store.select(selectCategoriesLoaded);
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
    public dialogRef: MatDialogRef<CategoryBrowserComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      isDialog: boolean;
      categories: any;
      isLoaded: any;
      error: any;
    },
    private store: Store<CategoriesState>
  ) {
    super(_snackBar, dialog);
    console.log('constructor Category Browser...');
  }

  override ngOnInit(): void {
    console.log('ngOnInit Category Browser...');

    if (this.data.isDialog) {
      this.error$ = this.data.error;
      this.isLoaded$ = this.data.isLoaded;
      this.categories$ = this.data.categories;
    }

    this.isLoaded$.subscribe((isloaded: boolean) => {
      this.loaded = isloaded;
    });

    this.browseData();
  }

  override ngAfterViewInit(): void {
    console.log('ngAfterViewInit Category Browser...');
  }

  override ngOnDestroy(): void {
    console.log('ngOnDestroy Category Browser...');
  }

  private browseData(): void {
    this.store.dispatch(initCategories());
  }
}

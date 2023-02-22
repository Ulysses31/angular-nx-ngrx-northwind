/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { MaterialColor } from '@nx-northwind/nx-material-ui';
import { CategoryLoaderDto } from '@nx-northwind/nx-northwind-app/entities';
import {
  BaseLoaderComponent,
  FunctionButtons
} from '@nx-northwind/nx-northwind-app/featured/shared';
import { LookupService } from '@nx-northwind/nx-northwind-app/services';
import { initCategory } from '../+state/categories.actions';
import { CategoriesState } from '../+state/categories.reducer';
import {
  deleteCategory,
  loadCategorySuccess,
  postCategory,
  putCategory
} from './../+state/categories.actions';
import {
  selectCategoriesError,
  selectCategoriesLoaded,
  selectCategory
} from './../+state/categories.selectors';

@Component({
  selector: 'nx-northwind-category-loader',
  templateUrl: './category-loader.component.html',
  styleUrls: ['./category-loader.component.scss']
})
export class CategoryLoaderComponent extends BaseLoaderComponent {
  categoryModel!: CategoryLoaderDto;
  category$ = this.store.select(selectCategory);
  error$ = this.store.select(selectCategoriesError);
  isLoaded$ = this.store.select(selectCategoriesLoaded);
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
    private store: Store<CategoriesState>
  ) {
    super(_snackBar, dialog, lookupService);
  }

  override ngOnInit(): void {
    console.log('ngOnInit Category Loader...');

    this.isLoaded$.subscribe((isloaded: boolean) => {
      this.loaded = isloaded;
    });

    this.loadData();
  }

  override ngAfterViewInit(): void {
    console.log('ngAfterViewInit Category Loader...');
  }

  override ngOnDestroy(): void {
    console.log('ngOnDestroy Category Loader...');
  }

  private loadData(): void {
    const param = this.route.snapshot.params;
    const btn = this.fnButtons$.find((btn) => btn.id === 'delete');

    if (param['id'] !== '0') {
      // Edit
      this.store.dispatch(initCategory({ selectedId: param['id'] }));
    } else {
      if (btn) btn.disabled = true;

      // Insert
      this.categoryModel = {
        CategoryID: '0',
        CategoryName: '',
        Description: ''
      };

      this.store.dispatch(
        loadCategorySuccess({
          category: this.categoryModel
        })
      );
    }

    this.category$.subscribe((category: CategoryLoaderDto) => {
      this.categoryModel = { ...category };
    });
  }

  private deleteData(): void {
    this.confirmDialog(
      'Delete',
      'Are you sure you want to delete it?'
    ).subscribe((result: boolean) => {
      if (result) {
        this.store.dispatch(
          deleteCategory({ delCategory: this.categoryModel })
        );
      }
    });
  }

  private saveData(): void {
    const param = this.route.snapshot.params;
    if (param['id'] !== '0') {
      //Edit
      this.store.dispatch(
        putCategory({
          selectedId: this.categoryModel.CategoryID,
          putCategory: this.categoryModel
        })
      );
    } else {
      // Insert
      this.store.dispatch(
        postCategory({
          newCategory: this.categoryModel
        })
      );
    }
  }

  public formStatus(frm: NgForm): void {
    console.log('Form is valid: ' + frm.valid);
  }
}

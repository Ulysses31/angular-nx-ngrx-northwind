/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CategoryDto } from '@nx-northwind/nx-northwind-app/entities';
import {
  BaseLoaderComponent,
  FunctionButtons
} from '@nx-northwind/nx-northwind-app/featured/shared';
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
  selectCategory
} from './../+state/categories.selectors';

@Component({
  selector: 'nx-northwind-category-loader',
  templateUrl: './category-loader.component.html',
  styleUrls: ['./category-loader.component.scss']
})
export class CategoryLoaderComponent extends BaseLoaderComponent {
  categoryModel!: CategoryDto;
  category$ = this.store.select(selectCategory);
  error$ = this.store.select(selectCategoriesError);

  fnButtons$: FunctionButtons[] = [
    {
      id: 'new',
      label: 'New',
      disabled: false,
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
      disabled: false,
      command: () => this.deleteData()
    },
    {
      id: 'save',
      label: 'Save',
      disabled: false,
      command: () => this.saveData()
    },
    {
      id: 'refresh',
      label: 'Refresh',
      disabled: false,
      command: () => this.loadData()
    }
  ];

  constructor(private store: Store<CategoriesState>) {
    super();
  }

  override ngOnInit(): void {
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

    this.category$.subscribe((category: CategoryDto) => {
      this.categoryModel = { ...category };
    });
  }

  private deleteData(): void {
    if (confirm('Are you sure you want to delete it?')) {
      this.store.dispatch(
        deleteCategory({ delCategory: this.categoryModel })
      );
    }
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
    console.log(frm);
  }
}

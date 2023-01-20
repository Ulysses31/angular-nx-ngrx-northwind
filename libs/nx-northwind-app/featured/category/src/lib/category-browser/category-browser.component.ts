/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BaseBrowserComponent,
  FunctionButtons
} from '@nx-northwind/nx-northwind-app/featured/shared';
import { initCategories } from '../+state/categories.actions';
import { CategoriesState } from '../+state/categories.reducer';
import {
  selectAllCategories,
  selectCategoriesError
} from './../+state/categories.selectors';

@Component({
  selector: 'nx-northwind-category-browser',
  templateUrl: './category-browser.component.html',
  styleUrls: ['./category-browser.component.scss']
})
export class CategoryBrowserComponent extends BaseBrowserComponent {
  categories$ = this.store.select(selectAllCategories);
  error$ = this.store.select(selectCategoriesError);

  fnButtons$: FunctionButtons[] = [
    {
      id: 'refresh',
      label: 'Refresh',
      disabled: false,
      command: () => this.browseData()
    }
  ];

  constructor(private store: Store<CategoriesState>) {
    super();
  }

  override ngOnInit(): void {
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

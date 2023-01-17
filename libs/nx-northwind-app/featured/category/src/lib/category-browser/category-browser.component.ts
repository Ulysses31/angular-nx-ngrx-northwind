import { selectAllCategories } from './../+state/categories.selectors';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { initCategories } from '../+state/categories.actions';
import { CategoriesState } from '../+state/categories.reducer';

@Component({
  selector: 'nx-northwind-category-browser',
  templateUrl: './category-browser.component.html',
  styleUrls: ['./category-browser.component.scss']
})
export class CategoryBrowserComponent implements OnInit {
  categories$ = this.store.select(selectAllCategories);

  constructor(private store: Store<CategoriesState>) {}

  ngOnInit(): void {
    this.store.dispatch(initCategories());
  }
}

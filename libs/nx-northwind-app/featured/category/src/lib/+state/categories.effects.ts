/* eslint-disable @typescript-eslint/no-explicit-any */
import { CategoriesState } from './categories.reducer';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryService } from '@nx-northwind/nx-northwind-app/services';
import { catchError, map, switchMap, tap, of } from 'rxjs';

import * as CategoriesActions from './categories.actions';

// for read operations switchMa
// for write operations concatMap, exhaustMap

@Injectable()
export class CategoriesEffects {
  private actions$: Actions = inject(Actions);
  private service = inject(CategoryService);

  // ******** INIT CATEGORIES *************************************//
  initCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.initCategories),
      switchMap(() =>
        this.service.browse().pipe(
          tap((data: any) => console.log(data)),
          map((data: CategoriesState) =>
            CategoriesActions.loadCategoriesSuccess({
              categories: data.categories
            })
          ),
          catchError((error) =>
            of(CategoriesActions.loadCategoriesFailure({ error }))
          )
        )
      )
    )
  );

  // ******** INIT CATEGORY *************************************//
  initCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.initCategory),
      switchMap((action) =>
        this.service.load(action.selectedId).pipe(
          tap((data: any) => console.log(data)),
          map((data: CategoriesState) =>
            CategoriesActions.loadCategorySuccess({
              category: data.category
            })
          ),
          catchError((error) =>
            of(CategoriesActions.loadCategoryFailure({ error }))
          )
        )
      )
    )
  );

  // ******** POST CATEGORY *************************************//
  postCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.postCategory),
      switchMap((action) =>
        this.service.create(action.newCategory).pipe(
          tap((data: any) => console.log(data)),
          map((data: CategoriesState) =>
            CategoriesActions.postCategorySuccess({
              category: data.category
            })
          ),
          catchError((error) =>
            of(CategoriesActions.postCategoryFailure({ error }))
          )
        )
      )
    )
  );

  // ******** PUT CATEGORY *************************************//
  putCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.putCategory),
      switchMap((action) =>
        this.service
          .update(action.selectedId, action.putCategory)
          .pipe(
            tap((data: any) => console.log(data)),
            map((data: CategoriesState) =>
              CategoriesActions.putCategorySuccess({
                category: data.category
              })
            ),
            catchError((error) =>
              of(CategoriesActions.putCategoryFailure({ error }))
            )
          )
      )
    )
  );

  // ******** DELETE CATEGORY **********************************//
  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.deleteCategory),
      switchMap((action) =>
        this.service.delete(action.delCategory.categoryID).pipe(
          tap((data: any) => console.log(data)),
          map(() => CategoriesActions.deleteCategorySuccess()),
          catchError((error) =>
            of(CategoriesActions.deleteCategoryFailure({ error }))
          )
        )
      )
    )
  );
}

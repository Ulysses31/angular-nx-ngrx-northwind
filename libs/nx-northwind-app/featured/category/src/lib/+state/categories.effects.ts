/* eslint-disable @typescript-eslint/no-explicit-any */
import { CategoriesState } from './categories.reducer';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryService } from '@nx-northwind/nx-northwind-app/services';
import { catchError, map, switchMap, tap, of, pipe } from 'rxjs';

import * as CategoriesActions from './categories.actions';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// for read operations switchMa
// for write operations concatMap, exhaustMap

@Injectable()
export class CategoriesEffects {
  private actions$: Actions = inject(Actions);
  private service = inject(CategoryService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  // ******** INIT CATEGORIES *************************************//
  initCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.initCategories),
      switchMap(() =>
        this.service.browse().pipe(
          tap((data: any) => console.log(data)),
          map((data: CategoriesState) => {
            data.categories.map((item) => {
              item.CreatedAt = item.CreatedAt
                ? moment(item.CreatedAt).format('DD/MM/YYYY HH:mm')
                : '';
              item.UpdatedAt = item.UpdatedAt
                ? moment(item.UpdatedAt).format('DD/MM/YYYY HH:mm')
                : '';
            });
            return data;
          }),
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
          map((data: CategoriesState) => {
            // data.categories[0].CreatedAt = data.categories[0]
            //   .CreatedAt
            //   ? moment(data.categories[0].CreatedAt).format(
            //       'MM/DD/YYYY'
            //     )
            //   : '';
            // data.categories[0].UpdatedAt = data.categories[0]
            //   .UpdatedAt
            //   ? moment(data.categories[0].UpdatedAt).format(
            //       'MM/DD/YYYY'
            //     )
            //   : '';
            return data;
          }),
          map((data: CategoriesState) =>
            CategoriesActions.loadCategorySuccess({
              category: data.categories[0]
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

  successPostCategory$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoriesActions.postCategorySuccess),
        pipe(
          tap(() => {
            this.snackBar.open('Record saved...', 'Close', {
              duration: 3000
            });
            const path =
              this.route.snapshot.pathFromRoot[0].queryParams[
                'backUrl'
              ];
            this.router.navigate([path]);
          })
        )
      ),
    { dispatch: false }
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

  successPutCategory$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoriesActions.putCategorySuccess),
        pipe(
          tap(() => {
            // const path =
            //   this.route.snapshot.pathFromRoot[0].queryParams[
            //     'backUrl'
            //   ];
            // this.router.navigate([path]);
            this.snackBar.open('Record updated...', 'Close', {
              duration: 3000
            });
          })
        )
      ),
    { dispatch: false }
  );

  // ******** DELETE CATEGORY **********************************//
  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.deleteCategory),
      switchMap((action) =>
        this.service.delete(action.delCategory.CategoryID).pipe(
          tap((data: any) => console.log(data)),
          map(() => CategoriesActions.deleteCategorySuccess()),
          catchError((error) =>
            of(CategoriesActions.deleteCategoryFailure({ error }))
          )
        )
      )
    )
  );

  successDeleteCategory$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoriesActions.deleteCategorySuccess),
        pipe(
          tap(() => {
            const path =
              this.route.snapshot.pathFromRoot[0].queryParams[
                'backUrl'
              ];
            this.router.navigate([path]);
            this.snackBar.open('Record deleted...', 'Close', {
              duration: 3000
            });
          })
        )
      ),
    { dispatch: false }
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  RegionService,
  TerritoryService
} from '@nx-northwind/nx-northwind-app/services';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as TerritoriesActions from './territories.actions';
import { TerritoriesState } from './territories.reducer';

@Injectable()
export class TerritoriesEffects {
  private actions$: Actions = inject(Actions) as any;
  private service = inject(TerritoryService);
  private regionsService = inject(RegionService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  // ******** INIT REGIONS *************************************//
  initTerritoryRegions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TerritoriesActions.initTerritoryRegions),
      switchMap(() =>
        this.regionsService.browse().pipe(
          tap((data: any) => console.log(data)),
          map((data: TerritoriesState) => {
            // data.regions.map((item) => {
            //   item.CreatedAt = item.CreatedAt
            //     ? moment(item.CreatedAt).format('DD/MM/YYYY HH:mm')
            //     : '';
            //   item.UpdatedAt = item.UpdatedAt
            //     ? moment(item.UpdatedAt).format('DD/MM/YYYY HH:mm')
            //     : '';
            // });
            return data;
          }),
          map((data: TerritoriesState) =>
            TerritoriesActions.loadTerritoryRegionsSuccess({
              regions: data.regions
            })
          ),
          catchError((error) =>
            of(
              TerritoriesActions.loadTerritoryRegionsFailure({
                error
              })
            )
          )
        )
      )
    )
  );

  // ******** INIT TERRITORIES *************************************//
  initTerritories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TerritoriesActions.initTerritories),
      switchMap(() =>
        this.service.browse().pipe(
          tap((data: any) => console.log(data)),
          map((data: TerritoriesState) => {
            // data.territories.map((item) => {
            //   item.CreatedAt = item.CreatedAt
            //     ? moment(item.CreatedAt).format('DD/MM/YYYY HH:mm')
            //     : '';
            //   item.UpdatedAt = item.UpdatedAt
            //     ? moment(item.UpdatedAt).format('DD/MM/YYYY HH:mm')
            //     : '';
            // });
            return data;
          }),
          map((data: TerritoriesState) =>
            TerritoriesActions.loadTerritoriesSuccess({
              territories: data.territories
            })
          ),
          catchError((error) =>
            of(TerritoriesActions.loadTerritoriesFailure({ error }))
          )
        )
      )
    )
  );

  // ******** INIT TERRITORY *************************************//
  initTerritory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TerritoriesActions.initTerritory),
      switchMap((action) =>
        this.service.load(action.selectedId).pipe(
          tap((data: any) => console.log(data)),
          map((data: TerritoriesState) =>
            TerritoriesActions.loadTerritorySuccess({
              territory: data.territories[0]
            })
          ),
          catchError((error) =>
            of(TerritoriesActions.loadTerritoryFailure({ error }))
          )
        )
      )
    )
  );

  // ******** POST TERRITORY *************************************//
  postTerritory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TerritoriesActions.postTerritory),
      switchMap((action) =>
        this.service.create(action.newTerritory).pipe(
          tap((data: any) => console.log(data)),
          map((data: TerritoriesState) =>
            TerritoriesActions.postTerritorySuccess({
              territory: data.territory
            })
          ),
          catchError((error) =>
            of(TerritoriesActions.postTerritoryFailure({ error }))
          )
        )
      )
    )
  );

  successPostTerritory$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TerritoriesActions.postTerritorySuccess),
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

  // ******** PUT TERRITORY *************************************//
  putTerritory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TerritoriesActions.putTerritory),
      switchMap((action) =>
        this.service
          .update(action.selectedId, action.putTerritory)
          .pipe(
            tap((data: any) => console.log(data)),
            map((data: TerritoriesState) =>
              TerritoriesActions.putTerritorySuccess({
                territory: data.territory
              })
            ),
            catchError((error) =>
              of(TerritoriesActions.putTerritoryFailure({ error }))
            )
          )
      )
    )
  );

  successPutTerritory$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TerritoriesActions.putTerritorySuccess),
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

  // ******** DELETE TERRITORY **********************************//
  deleteTerritory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TerritoriesActions.deleteTerritory),
      switchMap((action) =>
        this.service.delete(action.delTerritory.TerritoryID).pipe(
          tap((data: any) => console.log(data)),
          map(() => TerritoriesActions.deleteTerritorySuccess()),
          catchError((error) =>
            of(TerritoriesActions.deleteTerritoryFailure({ error }))
          )
        )
      )
    )
  );

  successDeleteTerritory$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TerritoriesActions.deleteTerritorySuccess),
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

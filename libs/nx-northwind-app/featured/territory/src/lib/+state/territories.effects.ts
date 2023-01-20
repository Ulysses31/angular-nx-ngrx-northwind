/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TerritoryService } from '@nx-northwind/nx-northwind-app/services';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import * as TerritoriesActions from './territories.actions';
import { TerritoriesState } from './territories.reducer';
import * as moment from 'moment';

@Injectable()
export class TerritoriesEffects {
  private actions$: Actions = inject(Actions) as any;
  private service = inject(TerritoryService);

  // ******** INIT TERRITORIES *************************************//
  initTerritories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TerritoriesActions.initTerritories),
      switchMap(() =>
        this.service.browse().pipe(
          tap((data: any) => console.log(data)),
          map((data: TerritoriesState) => {
            data.territories.map((item) => {
              item.CreatedAt = item.CreatedAt ? moment(item.CreatedAt).format('DD/MM/YYYY HH:MM') : '';
              item.UpdatedAt = item.UpdatedAt ? moment(item.UpdatedAt).format('DD/MM/YYYY HH:MM') : '';
            });
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
                territory: data.territory.body
              })
            ),
            catchError((error) =>
              of(TerritoriesActions.putTerritoryFailure({ error }))
            )
          )
      )
    )
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
}

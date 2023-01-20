/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RegionService } from '@nx-northwind/nx-northwind-app/services';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import * as RegionsActions from './regions.actions';
import { RegionsState } from './regions.reducer';
import * as moment from 'moment';

@Injectable()
export class RegionsEffects {
  private actions$: Actions = inject(Actions) as any;
  private service = inject(RegionService);

  // ******** INIT REGIONS *************************************//
  initRegions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegionsActions.initRegions),
      switchMap(() =>
        this.service.browse().pipe(
          tap((data: any) => console.log(data)),
          map((data: RegionsState) => {
            data.regions.map((item) => {
              item.CreatedAt = item.CreatedAt ? moment(item.CreatedAt).format('DD/MM/YYYY HH:MM') : '';
              item.UpdatedAt = item.UpdatedAt ? moment(item.UpdatedAt).format('DD/MM/YYYY HH:MM') : '';
            });
            return data;
          }),
          map((data: RegionsState) =>
            RegionsActions.loadRegionsSuccess({
              regions: data.regions
            })
          ),
          catchError((error) =>
            of(RegionsActions.loadRegionsFailure({ error }))
          )
        )
      )
    )
  );

  // ******** INIT REGION *************************************//
  initRegion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegionsActions.initRegion),
      switchMap((action) =>
        this.service.load(action.selectedId).pipe(
          tap((data: any) => console.log(data)),
          map((data: RegionsState) =>
            RegionsActions.loadRegionSuccess({
              region: data.regions[0]
            })
          ),
          catchError((error) =>
            of(RegionsActions.loadRegionFailure({ error }))
          )
        )
      )
    )
  );

  // ******** POST REGION *************************************//
  postRegion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegionsActions.postRegion),
      switchMap((action) =>
        this.service.create(action.newRegion).pipe(
          tap((data: any) => console.log(data)),
          map((data: RegionsState) =>
            RegionsActions.postRegionSuccess({
              region: data.region
            })
          ),
          catchError((error) =>
            of(RegionsActions.postRegionFailure({ error }))
          )
        )
      )
    )
  );

  // ******** PUT REGION *************************************//
  putRegion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegionsActions.putRegion),
      switchMap((action) =>
        this.service.update(action.selectedId, action.putRegion).pipe(
          tap((data: any) => console.log(data)),
          map((data: RegionsState) =>
            RegionsActions.putRegionSuccess({
              region: data.region.body
            })
          ),
          catchError((error) =>
            of(RegionsActions.putRegionFailure({ error }))
          )
        )
      )
    )
  );

  // ******** DELETE REGION **********************************//
  deleteRegion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegionsActions.deleteRegion),
      switchMap((action) =>
        this.service.delete(action.delRegion.RegionID).pipe(
          tap((data: any) => console.log(data)),
          map(() => RegionsActions.deleteRegionSuccess()),
          catchError((error) =>
            of(RegionsActions.deleteRegionFailure({ error }))
          )
        )
      )
    )
  );
}

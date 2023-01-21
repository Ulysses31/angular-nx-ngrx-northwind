/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'nx-northwind-mt-layout',
  template: ` <p>
      Resize your browser window to see the current screen size
      change.
    </p>
    <p>
      The current screen size is
      <strong>{{ currentScreenSize }}</strong>
    </p>`,
  styleUrls: ['./mt-layout.component.scss']
})
export class MtLayoutComponent implements OnInit, OnDestroy {
  destroyed = new Subject<void>();
  currentScreenSize: string = '';

  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge']
  ]);

  constructor(private breakpointObserver: BreakpointObserver) {
    console.log('nx-northwind-mt-layout constructor...');
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        console.log(result);
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize =
              this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
      });
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-layout OnInit...');
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}

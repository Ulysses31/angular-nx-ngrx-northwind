/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';

@Component({
  selector: 'nx-northwind-mt-table',
  template: `
    <div class="mat-elevation-z4">
      <table
        mat-table
        [dataSource]="matTableDs"
        matSort
        (matSortChange)="announceSortChange($event)"
        class="mat-elevation-z8">
        <ng-container
          *ngFor="let item of displayedColumns; let i = index"
          matColumnDef="{{ item }}">
          <th
            mat-header-cell
            *matHeaderCellDef
            mat-sort-header
            sortActionDescription="i">
            <b>{{ item | uppercase }}</b>
          </th>
          <td
            mat-cell
            *matCellDef="let element"
            [ngStyle]="{
              'background-color': element.checked
                ? 'rgb(216, 216, 216, 0.1)'
                : ''
            }">
            <mat-checkbox
              #mtCheck
              *ngIf="isSelectable && i === 0"
              (change)="getSelected($event, element)"
              [(ngModel)]="element.checked">
            </mat-checkbox>
            {{ element[item] }}
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr
          mat-row
          matRipple
          *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
      <mat-paginator
        #paginator
        *ngIf="hasPagination"
        [disabled]="disabled"
        [length]="length"
        [pageSize]="pageSize"
        [pageSizeOptions]="pageSizeOptions"
        (page)="pageEvent = $event"
        aria-label="Select page">
      </mat-paginator>
    </div>
  `,
  styleUrls: ['./mt-table.component.scss']
})
export class MtTableComponent implements OnInit, AfterViewInit, OnDestroy {
  pageEvent?: PageEvent;
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any[] = [];
  @Input() command: any;
  @Input() disabled: boolean = false;
  @Input() length: number = 0;
  @Input() pageSize: number = 5;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];
  @Input() hasPagination: boolean = true;
  @Input() isSelectable: boolean = true;
  dataSourceTmp: any[] = [];
  selectedRecord: any = null;
  @Output() selectedRecordSubj: Subject<any> = new Subject();

  @ViewChild(MatPaginator) paginator: MatPaginator = {
    pageSize: this.pageSize,
    pageSizeOptions: this.pageSizeOptions,
    length: this.length
  } as MatPaginator;

  @ViewChild(MatSort) sort: MatSort = {} as MatSort;

  matTableDs: any;
  selection: any;
  selectedRows: [] = [];
  initialSelection = [];
  allowMultiSelect = true;

  constructor(private _liveAnnouncer: LiveAnnouncer) {
    console.log('nx-northwind-mt-table constructor...');
  }

  ngAfterViewInit(): void {
    this.matTableDs.paginator = this.paginator;
    this.matTableDs.sort = this.sort;
  }

  ngOnInit(): void {
    console.log('nx-northwind-mt-table OnInit...');

    this.selectedRecordSubj.subscribe((item) => {
      this.selectedRecord = item;
    });

    // state is immutable so make a copy of the datasource
    this.dataSourceTmp = this.dataSource.map((items) => ({
      ...items
    }));

    !this.isSelectable
      ? this.displayedColumns?.shift()
      : this.displayedColumns;
    this.matTableDs = new MatTableDataSource(this.dataSourceTmp);
    this.selection = new SelectionModel<any>(
      this.allowMultiSelect,
      this.initialSelection
    );
  }

  ngOnDestroy(): void {
    console.log('nx-northwind-mt-table OnDestroy...');
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public getSelected(sl: any, element: any) {
    this.selection.clear();
    this.matTableDs.data.forEach((row: any) => {
      if (row !== element) {
        row.checked = false;
      }
      if (element.checked) {
        this.selection.select(element);
      }
    });

    this.selectedRecordSubj.next(this.selection.selected[0]);

    // this.selectedRecord = this.selection.selected[0];
  }

  public announceSortChange(sortState: any) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      console.log(`Sorted ${sortState.direction}ending`);
      this._liveAnnouncer.announce(
        `Sorted ${sortState.direction}ending`
      );
    } else {
      console.log('Sorting cleared');
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

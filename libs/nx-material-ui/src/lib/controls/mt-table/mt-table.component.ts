/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'nx-northwind-mt-table',
  template: `
    <div class="mat-elevation-z8">
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
              'background-color': element.checked ? '#f3f3f3' : ''
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
          *matRowDef="let row; columns: displayedColumns"
          (click)="command()"></tr>
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
export class MtTableComponent implements OnInit, AfterViewInit {
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
    !this.isSelectable
      ? this.displayedColumns?.shift()
      : this.displayedColumns;
    this.matTableDs = new MatTableDataSource(this.dataSource);
    this.selection = new SelectionModel<any>(
      this.allowMultiSelect,
      this.initialSelection
    );
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public getSelected(sl: any, element: any) {
    this.matTableDs.data.forEach((row: any) => {
      if (row.id === element.id && sl.checked) {
        this.selection.select(row);
        this.selectedRows = this.selection.selected;
      }
      if (row.id === element.id && !sl.checked) {
        this.selectedRows = this.selection.selected.filter(
          (item: any) => {
            return item.id !== element.id;
          }
        );
      }
    });
    // console.log(this.selectedRows);
  }

  public announceSortChange(sortState: any) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(
        `Sorted ${sortState.direction}ending`
      );
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

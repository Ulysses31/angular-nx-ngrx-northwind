/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { MaterialColor } from '@nx-northwind/nx-material-ui';
import { EmployeeTerritoryDto } from '@nx-northwind/nx-northwind-app/entities';
import {
  BaseLoaderComponent,
  FunctionButtons
} from '@nx-northwind/nx-northwind-app/featured/shared';
import {
  deleteEmployeeTerritory,
  initEmployeeTerritory,
  loadEmployeeTerritorySuccess,
  postEmployeeTerritory,
  putEmployeeTerritory
} from '../+state/employee-territories.actions';
import { EmployeeTerritoriesState } from '../+state/employee-territories.reducer';
import {
  selectEmployeeTerritoriesError,
  selectEmployeeTerritoriesLoaded,
  selectEmployeeTerritory
} from '../+state/employee-territories.selectors';

@Component({
  selector: 'nx-northwind-employee-territory-loader',
  templateUrl: './employee-territory-loader.component.html',
  styleUrls: ['./employee-territory-loader.component.scss']
})
export class EmployeeTerritoryLoaderComponent extends BaseLoaderComponent {
  employeeTerritoryModel!: EmployeeTerritoryDto;
  employeeTerritory$ = this.store.select(selectEmployeeTerritory);
  error$ = this.store.select(selectEmployeeTerritoriesError);
  isLoaded$ = this.store.select(selectEmployeeTerritoriesLoaded);
  loaded: boolean = true;

  fnButtons$: FunctionButtons[] = [
    {
      id: 'new',
      label: 'New',
      toolTipMessage: 'Insert new record',
      disabled: false,
      icon: 'add',
      color: MaterialColor.Basic,
      command: () => {
        const path =
          this.route.snapshot.pathFromRoot[0].queryParams['backUrl'];
        this.router
          .navigate([path, 0], {
            queryParams: { backUrl: path }
          })
          .then(() => this.loadData());
      }
    },
    {
      id: 'delete',
      label: 'Delete',
      toolTipMessage: 'Delete current record',
      color: MaterialColor.Basic,
      icon: 'delete',
      disabled: false,
      command: () => this.deleteData()
    },
    {
      id: 'save',
      label: 'Save',
      toolTipMessage: 'Save current record',
      color: MaterialColor.Basic,
      icon: 'save',
      disabled: false,
      command: () => this.saveData()
    },
    {
      id: 'refresh',
      label: 'Refresh',
      toolTipMessage: 'Refresh record data',
      color: MaterialColor.Basic,
      icon: 'sync',
      disabled: false,
      command: () => this.loadData()
    }
  ];

  constructor(
    public override _snackBar: MatSnackBar,
    public override dialog: MatDialog,
    private store: Store<EmployeeTerritoriesState>
  ) {
    super(_snackBar, dialog);
  }

  override ngOnInit(): void {
    console.log('ngOnInit EmployeeTerritory Loader...');

    this.isLoaded$.subscribe((isloaded: boolean) => {
      this.loaded = isloaded;
    });

    this.loadData();
  }

  override ngAfterViewInit(): void {
    console.log('ngAfterViewInit EmployeeTerritory Loader...');
  }

  override ngOnDestroy(): void {
    console.log('ngOnDestroy EmployeeTerritory Loader...');
  }

  private loadData(): void {
    const param = this.route.snapshot.params;
    const btn = this.fnButtons$.find((btn) => btn.id === 'delete');

    if (param['id'] !== '0') {
      // Edit
      this.store.dispatch(
        initEmployeeTerritory({ selectedId: param['id'] })
      );
    } else {
      if (btn) btn.disabled = true;

      // Insert
      this.employeeTerritoryModel = {
        EmployeeID: '',
        TerritoryID: ''
      };

      this.store.dispatch(
        loadEmployeeTerritorySuccess({
          employeeTerritory: this.employeeTerritoryModel
        })
      );
    }

    this.employeeTerritory$.subscribe(
      (employeeTerritory: EmployeeTerritoryDto) => {
        this.employeeTerritoryModel = { ...employeeTerritory };
      }
    );
  }

  private deleteData(): void {
    this.confirmDialog(
      'Delete',
      'Are you sure you want to delete it?'
    ).subscribe((result: boolean) => {
      if (result) {
        this.store.dispatch(
          deleteEmployeeTerritory({
            delEmployeeTerritory: this.employeeTerritoryModel
          })
        );
      }
    });
  }

  private saveData(): void {
    const param = this.route.snapshot.params;
    if (param['id'] !== '0') {
      //Edit
      this.store.dispatch(
        putEmployeeTerritory({
          selectedId: this.employeeTerritoryModel.Id || '',
          putEmployeeTerritory: this.employeeTerritoryModel
        })
      );
    } else {
      // Insert
      this.store.dispatch(
        postEmployeeTerritory({
          newEmployeeTerritory: this.employeeTerritoryModel
        })
      );
    }
  }

  public formStatus(frm: NgForm): void {
    console.log('Form is valid: ' + frm.valid);
  }
}

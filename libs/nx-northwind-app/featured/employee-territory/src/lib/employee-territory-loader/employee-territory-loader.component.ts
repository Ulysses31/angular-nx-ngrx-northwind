/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  Validators
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { MaterialColor } from '@nx-northwind/nx-material-ui';
import { EmployeeBrowserComponent } from '@nx-northwind/nx-northwind-app/featured/employee';
import {
  BaseLoaderComponent,
  FunctionButtons
} from '@nx-northwind/nx-northwind-app/featured/shared';
import { TerritoryBrowserComponent } from '@nx-northwind/nx-northwind-app/featured/territory';
import { LookupService } from '@nx-northwind/nx-northwind-app/services';
import { of, tap } from 'rxjs';
import {
  deleteEmployeeTerritory,
  initEmployeeTerritoriesEmployees,
  initEmployeeTerritory,
  loadEmployeeTerritorySuccess,
  postEmployeeTerritory,
  putEmployeeTerritory
} from '../+state/employee-territories.actions';
import { initEmployeeTerritoriesTerritories } from './../+state/employee-territories.actions';
import { EmployeeTerritoriesState } from '../+state/employee-territories.reducer';
import {
  selectAllEmployees,
  selectAllTerritories,
  selectEmployeeTerritoriesError,
  selectEmployeeTerritoriesLoaded,
  selectEmployeeTerritory
} from '../+state/employee-territories.selectors';
import { EmployeeTerritoryLoaderDto } from '@nx-northwind/nx-northwind-app/entities';

@Component({
  selector: 'nx-northwind-employee-territory-loader',
  templateUrl: './employee-territory-loader.component.html',
  styleUrls: ['./employee-territory-loader.component.scss']
})
export class EmployeeTerritoryLoaderComponent extends BaseLoaderComponent {
  employeeTerritoryModel!: EmployeeTerritoryLoaderDto;
  employeeTerritory$ = this.store.select(selectEmployeeTerritory);
  employees$ = this.store.select(selectAllEmployees);
  territories$ = this.store.select(selectAllTerritories);
  error$ = this.store.select(selectEmployeeTerritoriesError);
  isLoaded$ = this.store.select(selectEmployeeTerritoriesLoaded);
  loaded: boolean = true;

  public formGroup = this.fb.group({
    Id: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    EmployeeID: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    Employee: new FormControl(
      { value: '', disabled: false },
      Validators.required
    ),
    TerritoryID: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    Territory: new FormControl(
      { value: '', disabled: false },
      Validators.required
    )
  });

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
      disabled: this.formGroup.status !== 'VALID',
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
    public override lookupService: LookupService,
    private store: Store<EmployeeTerritoriesState>,
    private fb: FormBuilder
  ) {
    super(_snackBar, dialog, lookupService);
  }

  override ngOnInit(): void {
    console.log('ngOnInit EmployeeTerritory Loader...');

    this.isLoaded$.subscribe((isloaded: boolean) => {
      this.loaded = isloaded;
    });

    of(null)
      .pipe(
        tap(() => {
          this.store.dispatch(initEmployeeTerritoriesTerritories());
          this.store.dispatch(initEmployeeTerritoriesEmployees());
        })
      )
      .subscribe(() => this.loadData());
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
        Id: '0',
        EmployeeID: '',
        LU_Employee: '',
        TerritoryID: '',
        LU_Territory: ''
      };

      this.store.dispatch(
        loadEmployeeTerritorySuccess({
          employeeTerritory: this.employeeTerritoryModel
        })
      );
    }

    this.employeeTerritory$.subscribe(
      (employeeTerritory: EmployeeTerritoryLoaderDto) => {
        this.employeeTerritoryModel = { ...employeeTerritory };

        this.formGroup.patchValue({
          EmployeeID: this.employeeTerritoryModel.EmployeeID,
          Employee: this.employeeTerritoryModel.LU_Employee,
          TerritoryID: this.employeeTerritoryModel.TerritoryID,
          Territory: this.employeeTerritoryModel.LU_Territory
        });
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

  public onFormChange(frm: FormGroupDirective): void {
    const btn = this.fnButtons$.find((btn) => btn.id === 'save');
    if (btn) btn.disabled = !(frm.form.status === 'VALID');
  }

  private lookupValidation(isValid: boolean): void {
    const btn = this.fnButtons$.find((btn) => btn.id === 'save');
    if (btn) btn.disabled = !isValid;
  }

  public employeesLookup = (args: any): void => {
    if (!args) args = null;

    const data = {
      isDialog: true,
      employees: this.employees$,
      isLoaded: this.isLoaded$,
      error: this.error$
    };

    this.lookupService
      .openLookup(args, EmployeeBrowserComponent, data)
      .afterClosed()
      .subscribe((result: any) => {
        if (result) {
          this.employeeTerritoryModel.EmployeeID = result.EmployeeID;
          this.employeeTerritoryModel.LU_Employee = `${result.LastName} ${result.FirstName}`;
        }
        this.lookupValidation(this.formGroup.valid);
      });
  };

  public territoriesLookup = (args: any): void => {
    if (!args) args = null;

    const data = {
      isDialog: true,
      territories: this.territories$,
      isLoaded: this.isLoaded$,
      error: this.error$
    };

    this.lookupService
      .openLookup(args, TerritoryBrowserComponent, data)
      .afterClosed()
      .subscribe((result: any) => {
        if (result) {
          this.employeeTerritoryModel.TerritoryID =
            result.TerritoryID;
          this.employeeTerritoryModel.LU_Territory =
            result.TerritoryDescription;
        }
        this.lookupValidation(this.formGroup.valid);
      });
  };
}

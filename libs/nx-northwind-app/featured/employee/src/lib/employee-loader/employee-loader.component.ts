/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { MaterialColor } from '@nx-northwind/nx-material-ui';
import { EmployeeLoaderDto } from '@nx-northwind/nx-northwind-app/entities';
import {
  BaseLoaderComponent,
  FunctionButtons
} from '@nx-northwind/nx-northwind-app/featured/shared';
import {
  deleteEmployee,
  initEmployee,
  loadEmployeeSuccess,
  postEmployee,
  putEmployee
} from '../+state/employees.actions';
import { EmployeesState } from '../+state/employees.reducer';
import {
  selectEmployee,
  selectEmployeesError,
  selectEmployeesLoaded
} from '../+state/employees.selectors';

@Component({
  selector: 'nx-northwind-employee-loader',
  templateUrl: './employee-loader.component.html',
  styleUrls: ['./employee-loader.component.scss']
})
export class EmployeeLoaderComponent extends BaseLoaderComponent {
  employeeModel!: EmployeeLoaderDto;
  employee$ = this.store.select(selectEmployee);
  error$ = this.store.select(selectEmployeesError);
  isLoaded$ = this.store.select(selectEmployeesLoaded);
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
    private store: Store<EmployeesState>
  ) {
    super(_snackBar, dialog);
  }

  override ngOnInit(): void {
    console.log('ngOnInit Employee Loader...');

    this.isLoaded$.subscribe((isloaded: boolean) => {
      this.loaded = isloaded;
    });

    this.loadData();
  }

  override ngAfterViewInit(): void {
    console.log('ngAfterViewInit Employee Loader...');
  }

  override ngOnDestroy(): void {
    console.log('ngOnDestroy Employee Loader...');
  }

  private loadData(): void {
    const param = this.route.snapshot.params;
    const btn = this.fnButtons$.find((btn) => btn.id === 'delete');

    if (param['id'] !== '0') {
      // Edit
      this.store.dispatch(initEmployee({ selectedId: param['id'] }));
    } else {
      if (btn) btn.disabled = true;

      // Insert
      this.employeeModel = {
        EmployeeID: '0',
        LastName: '',
        FirstName: '',
        Title: '',
        TitleOfCourtesy: '',
        BirthDate: new Date().toDateString(),
        HireDate: new Date().toDateString(),
        Address: '',
        City: '',
        Region: '',
        PostalCode: '',
        Country: '',
        HomePhone: '',
        Extension: '',
        Notes: '',
        ReportsTo: '',
        PhotoPath: ''
      };

      this.store.dispatch(
        loadEmployeeSuccess({
          employee: this.employeeModel
        })
      );
    }

    this.employee$.subscribe((employee: EmployeeLoaderDto) => {
      this.employeeModel = { ...employee };
    });
  }

  private deleteData(): void {
    this.confirmDialog(
      'Delete',
      'Are you sure you want to delete it?'
    ).subscribe((result: boolean) => {
      if (result) {
        this.store.dispatch(
          deleteEmployee({ delEmployee: this.employeeModel })
        );
      }
    });
  }

  private saveData(): void {
    const param = this.route.snapshot.params;
    if (param['id'] !== '0') {
      //Edit
      this.store.dispatch(
        putEmployee({
          selectedId: this.employeeModel.EmployeeID,
          putEmployee: this.employeeModel
        })
      );
    } else {
      // Insert
      this.store.dispatch(
        postEmployee({
          newEmployee: this.employeeModel
        })
      );
    }
  }

  public formStatus(frm: NgForm): void {
    console.log('Form is valid: ' + frm.valid);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EmployeeBrowserDto,
  EmployeeLoaderDto
} from '@nx-northwind/nx-northwind-app/entities';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseService<
  EmployeeBrowserDto,
  EmployeeLoaderDto
> {
  constructor(public override http: HttpClient) {
    super(http);
    console.log(
      'EmployeeService constructor... [http://localhost:3333/employee]'
    );
    this.setApiUrl('http://localhost:3333/employee');
  }
}

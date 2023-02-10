import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EmployeeTerritoryBrowserDto,
  EmployeeTerritoryLoaderDto
} from '@nx-northwind/nx-northwind-app/entities';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeTerritoryService extends BaseService<
  EmployeeTerritoryBrowserDto,
  EmployeeTerritoryLoaderDto
> {
  constructor(public override http: HttpClient) {
    super(http);
    console.log(
      'EmployeeTerritoryService constructor... [http://localhost:3333/employee-territory]'
    );
    this.setApiUrl('http://localhost:3333/employee-territory');
  }
}

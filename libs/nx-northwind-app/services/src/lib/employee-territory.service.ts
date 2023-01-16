import { EmployeeTerritoryDto } from '@nx-northwind/nx-northwind-app/entities';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeTerritoryService extends BaseService<EmployeeTerritoryDto> {
  constructor(public override http: HttpClient) {
    super(http);
    console.log('EmployeeTerritoryService constructor...');
  }
}

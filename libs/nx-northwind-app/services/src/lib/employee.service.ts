import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseService<EmployeeService> {
  constructor(public override http: HttpClient) {
    super(http);
    console.log('EmployeeService constructor...');
  }
}

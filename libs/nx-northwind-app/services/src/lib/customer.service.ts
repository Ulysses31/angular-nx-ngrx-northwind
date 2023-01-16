import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { CustomerDto } from '@nx-northwind/nx-northwind-app/entities';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService<CustomerDto> {
  constructor(public override http: HttpClient) {
    super(http);
    console.log('CustomerService constructor...');
    this.setApiUrl('http://localhost:3333/category');
    console.log(this.getApiUrl());
  }
}

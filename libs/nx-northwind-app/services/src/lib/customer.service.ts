import { CustomerDto } from './../../../entities/src/lib/customer-dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService<CustomerDto> {
  constructor(public override http: HttpClient) {
    super(http);
    console.log('CustomerService constructor...');
  }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CustomerBrowserDto,
  CustomerLoaderDto
} from '@nx-northwind/nx-northwind-app/entities';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService<
  CustomerBrowserDto,
  CustomerLoaderDto
> {
  constructor(public override http: HttpClient) {
    super(http);
    console.log(
      'CustomerService constructor... [http://localhost:3333/customer]'
    );
    this.setApiUrl('http://localhost:3333/customer');
  }
}

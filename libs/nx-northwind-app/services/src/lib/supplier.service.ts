import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  SupplierBrowserDto,
  SupplierLoaderDto
} from '@nx-northwind/nx-northwind-app/entities';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService extends BaseService<
  SupplierBrowserDto,
  SupplierLoaderDto
> {
  constructor(public override http: HttpClient) {
    super(http);
    console.log(
      'SupplierService constructor... [http://localhost:3333/supplier]'
    );
    this.setApiUrl('http://localhost:3333/supplier');
  }
}

import { SupplierDto } from '@nx-northwind/nx-northwind-app/entities';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupplierService extends BaseService<SupplierDto> {
  constructor(public override http: HttpClient) {
    super(http);
    console.log(
      'SupplierService constructor... [http://localhost:3333/supplier]'
    );
    this.setApiUrl('http://localhost:3333/supplier');
  }
}

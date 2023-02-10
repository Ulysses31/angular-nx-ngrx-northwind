import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  OrderBrowserDto,
  OrderLoaderDto
} from '@nx-northwind/nx-northwind-app/entities';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<
  OrderBrowserDto,
  OrderLoaderDto
> {
  constructor(public override http: HttpClient) {
    super(http);
    console.log(
      'OrderService constructor... [http://localhost:3333/order]'
    );
    this.setApiUrl('http://localhost:3333/order');
  }
}

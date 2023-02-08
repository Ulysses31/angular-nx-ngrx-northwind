import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDetailDto } from '@nx-northwind/nx-northwind-app/entities';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService extends BaseService<OrderDetailDto> {
  constructor(public override http: HttpClient) {
    super(http);
    console.log(
      'OrderDetailService constructor... [http://localhost:3333/order-detail]'
    );
    this.setApiUrl('http://localhost:3333/order-detail');
  }
}

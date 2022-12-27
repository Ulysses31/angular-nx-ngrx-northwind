import { OrderDto } from './../../../entities/src/lib/order-dto';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<OrderDto> {
  constructor(public override http: HttpClient) {
    super(http);
    console.log('OrderService constructor...');
  }
}

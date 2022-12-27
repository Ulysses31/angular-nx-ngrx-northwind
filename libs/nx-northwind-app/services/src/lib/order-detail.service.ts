import { OrderDetailDto } from './../../../entities/src/lib/order-detail-dto';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService extends BaseService<OrderDetailDto> {
  constructor(public override http: HttpClient) {
    super(http);
    console.log('OrderDetailService constructor...');
  }
}


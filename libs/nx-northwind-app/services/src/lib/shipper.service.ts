import { ShipperDto } from '@nx-northwind/nx-northwind-app/entities';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShipperService extends BaseService<ShipperDto> {
  constructor(public override http: HttpClient) {
    super(http);
    console.log('ShipperService constructor...');
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShipperDto } from '@nx-northwind/nx-northwind-app/entities';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ShipperService extends BaseService<ShipperDto> {
  constructor(public override http: HttpClient) {
    super(http);
    console.log(
      'ShipperService constructor... [http://localhost:3333/shipper]'
    );
    this.setApiUrl('http://localhost:3333/shipper');
  }
}

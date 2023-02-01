import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TerritoryDto } from '@nx-northwind/nx-northwind-app/entities';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TerritoryService extends BaseService<TerritoryDto> {
  constructor(public override http: HttpClient) {
    super(http);
    console.log(
      'TerritoryService constructor... [http://localhost:3333/territory]'
    );
    this.setApiUrl('http://localhost:3333/territory');
  }
}

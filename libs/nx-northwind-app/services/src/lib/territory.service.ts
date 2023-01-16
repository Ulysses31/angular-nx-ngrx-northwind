import { TerritoryDto } from '@nx-northwind/nx-northwind-app/entities';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TerritoryService extends BaseService<TerritoryDto> {
  constructor(public override http: HttpClient) {
    super(http);
    console.log('TerritoryService constructor...');
  }
}

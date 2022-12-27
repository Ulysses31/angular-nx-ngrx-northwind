import { TerritoryDto } from './../../../entities/src/lib/territory-dto';
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

import { RegionDto } from './../../../entities/src/lib/region-dto';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegionService extends BaseService<RegionDto> {
  constructor(public override http: HttpClient) {
    super(http);
    console.log('RegionService constructor...');
  }
}


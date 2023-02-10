import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  RegionBrowserDto,
  RegionLoaderDto
} from '@nx-northwind/nx-northwind-app/entities';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RegionService extends BaseService<
  RegionBrowserDto,
  RegionLoaderDto
> {
  constructor(public override http: HttpClient) {
    super(http);
    console.log(
      'RegionService constructor... [http://localhost:3333/region]'
    );
    this.setApiUrl('http://localhost:3333/region');
  }
}

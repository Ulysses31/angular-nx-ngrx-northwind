import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import {
  CategoryBrowserDto,
  CategoryLoaderDto
} from '@nx-northwind/nx-northwind-app/entities';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<
  CategoryBrowserDto,
  CategoryLoaderDto
> {
  constructor(public override http: HttpClient) {
    super(http);
    console.log(
      'CategoryService constructor... [http://localhost:3333/category]'
    );
    this.setApiUrl('http://localhost:3333/category');
  }
}

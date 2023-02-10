import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ProductBrowserDto,
  ProductLoaderDto
} from '@nx-northwind/nx-northwind-app/entities';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<
  ProductBrowserDto,
  ProductLoaderDto
> {
  constructor(public override http: HttpClient) {
    super(http);
    console.log(
      'ProductService constructor... [http://localhost:3333/product]'
    );
    this.setApiUrl('http://localhost:3333/product');
  }
}

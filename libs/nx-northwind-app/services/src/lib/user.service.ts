import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  UserBrowserDto,
  UserLoaderDto
} from '@nx-northwind/nx-northwind-app/entities';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<
  UserBrowserDto,
  UserLoaderDto
> {
  constructor(public override http: HttpClient) {
    super(http);
    console.log('UserService constructor...');
  }
}

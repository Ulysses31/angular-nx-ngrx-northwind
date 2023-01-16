import { UserDto } from '@nx-northwind/nx-northwind-app/entities';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<UserDto> {
  constructor(public override http: HttpClient) {
    super(http);
    console.log('UserService constructor...');
  }
}

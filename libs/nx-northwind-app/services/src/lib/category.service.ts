import { CategoryDto } from './../../../entities/src/lib/category-dto';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<CategoryDto> {
  constructor(public override http: HttpClient) {
    super(http);
    console.log('CategoryService constructor...');
  }
}


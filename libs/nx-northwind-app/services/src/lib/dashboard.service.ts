import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CustomersCountOrdersPerYearDto,
  CustomersCountPerYearDto,
  EmployeesTotalSalesPerYearDto,
  SalesTotalAmountPerYearDto,
  SalesTotalPerCategoryDto,
  SalesTotalPerYearDto
} from '@nx-northwind/nx-northwind-app/entities';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiServiceUrl = 'http://localhost:3333/dashboard';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient) {
    console.log('DashboardService constructor...');
  }

  getApiUrl(): string {
    return this.apiServiceUrl;
  }

  setApiUrl(url: string): void {
    if (url) this.apiServiceUrl = url;
  }

  browseSalesTotalPerYear(): Observable<SalesTotalPerYearDto[]> {
    console.log('Browsing SalesTotalPerYear...');
    return this.http.get<SalesTotalPerYearDto[]>(
      this.apiServiceUrl + '/sales-total-per-year',
      this.httpOptions
    );
  }

  browseSalesTotalAmountPerYear(): Observable<
    SalesTotalAmountPerYearDto[]
  > {
    console.log('Browsing SalesTotalAmountPerYearDto...');
    return this.http.get<SalesTotalAmountPerYearDto[]>(
      this.apiServiceUrl + '/sales-total-amount-per-year',
      this.httpOptions
    );
  }

  browseCustomersCountPerYear(): Observable<
    CustomersCountPerYearDto[]
  > {
    console.log('Browsing CustomersCountPerYearDto...');
    return this.http.get<CustomersCountPerYearDto[]>(
      this.apiServiceUrl + '/customers-count-per-year',
      this.httpOptions
    );
  }

  loadSalesTotalPerCategory(
    year: string
  ): Observable<SalesTotalPerCategoryDto[]> {
    return this.http.get<SalesTotalPerCategoryDto[]>(
      `${this.apiServiceUrl}/sales-total-per-category/${year}`,
      this.httpOptions
    );
  }

  loadEmployeesTotalSalesPerYear(
    year: string
  ): Observable<EmployeesTotalSalesPerYearDto[]> {
    return this.http.get<EmployeesTotalSalesPerYearDto[]>(
      `${this.apiServiceUrl}/employees-total-sales-per-year/${year}`,
      this.httpOptions
    );
  }

  loadCustomersCountOrdersPerYear(
    year: string
  ): Observable<CustomersCountOrdersPerYearDto[]> {
    return this.http.get<CustomersCountOrdersPerYearDto[]>(
      `${this.apiServiceUrl}/customers-count-orders-per-year/${year}`,
      this.httpOptions
    );
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBaseService } from './interfaces/ibase-service';

@Injectable({
  providedIn: 'root'
})
export class BaseService<TModelBrowser, TModelLoader> implements IBaseService<TModelBrowser, TModelLoader> {
  private apiServiceUrl = '';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient) {
    console.log('BaseService constructor...');
  }

  getApiUrl(): string {
    return this.apiServiceUrl;
  }

  setApiUrl(url: string): void {
    if (url) this.apiServiceUrl = url;
  }

  browse(): Observable<TModelBrowser[]> {
    console.log('Browsing...');
    return this.http.get<TModelBrowser[]>(
      this.apiServiceUrl,
      this.httpOptions
    );
  }

  load(id: string): Observable<TModelLoader> {
    return this.http.get<TModelLoader>(
      `${this.apiServiceUrl}/${id}`,
      this.httpOptions
    );
  }

  create(dto: TModelLoader): Observable<TModelLoader> {
    return this.http.post<TModelLoader>(
      this.apiServiceUrl,
      dto,
      this.httpOptions
    );
  }

  update(id: string, dto: TModelLoader): Observable<TModelLoader> {
    return this.http.put<TModelLoader>(
      `${this.apiServiceUrl}/${id}`,
      dto,
      this.httpOptions
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServiceUrl}/${id}`,
      this.httpOptions
    );
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBaseService } from './interfaces/ibase-service';

@Injectable({
  providedIn: 'root'
})
export class BaseService<TModel> implements IBaseService<TModel> {
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

  browse(): Observable<TModel[]> {
    return this.http.get<TModel[]>(
      this.apiServiceUrl,
      this.httpOptions
    );
  }

  load(id: string): Observable<TModel> {
    return this.http.get<TModel>(
      `${this.apiServiceUrl}/${id}`,
      this.httpOptions
    );
  }

  create(dto: TModel): Observable<TModel> {
    return this.http.post<TModel>(
      this.apiServiceUrl,
      { body: dto },
      this.httpOptions
    );
  }

  update(id: string, dto: TModel): Observable<TModel> {
    return this.http.put<TModel>(
      `${this.apiServiceUrl}/${id}`,
      { body: dto },
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

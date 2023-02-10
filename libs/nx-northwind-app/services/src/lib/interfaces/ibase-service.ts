import { Observable } from 'rxjs';

export interface IBaseService<TModelBrowser, TModelLoader> {
  getApiUrl(): string;
  setApiUrl(url: string): void;
  browse(): Observable<TModelBrowser[]>;
  load(id: string): Observable<TModelLoader>;
  create(dto: TModelLoader): Observable<TModelLoader>;
  update(id: string, dto: TModelLoader): Observable<TModelLoader>;
  delete(id: string): Observable<void>;
}

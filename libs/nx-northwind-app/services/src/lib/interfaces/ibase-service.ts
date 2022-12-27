import { Observable } from 'rxjs';

export interface IBaseService<TModel> {
  getApiUrl(): string;
  setApiUrl(url: string): void;
  browse(): Observable<T[]>;
  load(id: string): Observable<TModel>;
  create(dto: TModel): Observable<TModel>;
  update(id: string, dto: TModel): Observable<TModel>;
  delete(id: string): Observable<void>;
}

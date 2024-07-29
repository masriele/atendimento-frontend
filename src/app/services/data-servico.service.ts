import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataServico } from '../models/dataServico';

@Injectable({
  providedIn: 'root',
})
export class DataServicoService {
  private API_URL = 'http://localhost:5210/DataServico';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<DataServico[]> {
    return this.httpClient.get<DataServico[]>(this.API_URL);
  }

  getAllPaginated(pageIndex: number, pageSize: number): Observable<any> {
    let params = new HttpParams()
      .set('PageNumber', pageIndex)
      .set('PageSize', pageSize);
    return this.httpClient.get<any>(this.API_URL + '/pagination', { params });
  }

  getFilter(id: number): Observable<any> {
    return this.httpClient.get<any>(
      this.API_URL + '/filter/' + id + '/pagination'
    );
  }

  getById(id: number): Observable<DataServico> {
    return this.httpClient.get<DataServico>(this.API_URL + '/' + id);
  }

  create(dataServico: DataServico) {
    return this.httpClient.post<DataServico>(this.API_URL, dataServico);
  }

  delete(id: number) {
    return this.httpClient.delete(this.API_URL + '/' + id);
  }

  update(id: number, dataServico: DataServico): Observable<DataServico> {
    return this.httpClient.put<DataServico>(
      this.API_URL + '/' + id,
      dataServico
    );
  }
}

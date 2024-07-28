import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataSemana } from '../models/dataSemana';

@Injectable({
  providedIn: 'root',
})
export class DataSemanaService {
  private API_URL = 'http://localhost:5210/DataSemana';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<DataSemana[]> {
    return this.httpClient.get<DataSemana[]>(this.API_URL);
  }

  getAllPaginated(pageIndex: number, pageSize: number): Observable<any> {
    let params = new HttpParams()
      .set('PageNumber', pageIndex)
      .set('PageSize', pageSize);
    return this.httpClient.get<any>(this.API_URL + '/pagination', { params });
  }

  getById(id: number): Observable<DataSemana> {
    return this.httpClient.get<DataSemana>(this.API_URL + '/' + id);
  }

  create(dataSemana: DataSemana, servicoId: number): Observable<DataSemana[]> {
    let params = new HttpParams().set('ServicoId', servicoId.toString());
    return this.httpClient.post<DataSemana[]>(this.API_URL, [dataSemana], { params });
  }

  delete(id: number) {
    return this.httpClient.delete(this.API_URL + '/' + id);
  }

  update(id: number, dataSemana: DataSemana): Observable<DataSemana> {
    return this.httpClient.put<DataSemana>(
      this.API_URL + '/' + id,
      dataSemana
    );
  }
}

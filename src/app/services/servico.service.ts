import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servico } from '../models/servico';

@Injectable({
  providedIn: 'root',
})
export class ServicoService {
  private API_URL = 'http://localhost:5210/Servico';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Servico[]> {
    return this.httpClient.get<Servico[]>(this.API_URL);
  }
  getAllPaginated(pageIndex: number, pageSize: number): Observable<any> {
    let params = new HttpParams()
      .set('PageNumber', pageIndex)
      .set('PageSize', pageSize);
    return this.httpClient.get<any>(this.API_URL + '/pagination', { params });
  }

  getById(id: number): Observable<Servico> {
    return this.httpClient.get<Servico>(this.API_URL + '/' + id);
  }

  create(servico: Servico) {
    return this.httpClient.post<Servico>(this.API_URL, servico);
  }

  delete(id: number) {
    return this.httpClient.delete(this.API_URL + '/' + id);
  }

  update(id: number, servico: Servico): Observable<Servico> {
    return this.httpClient.put<Servico>(
      this.API_URL + '/' + id,
      servico
    );
  }
}

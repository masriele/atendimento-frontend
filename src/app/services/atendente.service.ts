import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atendente } from '../models/atendente';

@Injectable({
  providedIn: 'root',
})
export class AtendenteService {
  private API_URL = 'http://localhost:5210/Atendente';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Atendente[]> {
    return this.httpClient.get<Atendente[]>(this.API_URL);
  }  

  getAllPaginated(pageIndex: number, pageSize: number): Observable<any> {
    let params = new HttpParams()
      .set('PageNumber', pageIndex)
      .set('PageSize', pageSize);
    return this.httpClient.get<any>(this.API_URL + '/pagination', { params });
  }

  getById(id: number): Observable<Atendente> {
    return this.httpClient.get<Atendente>(this.API_URL + '/' + id);
  }

  create(atendente: Atendente) {
    return this.httpClient.post<Atendente>(this.API_URL, atendente);
  }

  delete(id: number) {
    return this.httpClient.delete(this.API_URL + '/' + id);
  }

  update(id: number, atendente: Atendente): Observable<Atendente> {
    return this.httpClient.put<Atendente>(
      this.API_URL + '/' + id,
      atendente
    );
  }
}

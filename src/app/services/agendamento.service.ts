import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agendamento } from '../models/agendamento';

@Injectable({
  providedIn: 'root',
})
export class AgendamentoService {
  private API_URL = 'http://localhost:5210/Agendamento';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Agendamento[]> {
    return this.httpClient.get<Agendamento[]>(this.API_URL);
  }

  getAllPaginated(pageIndex: number, pageSize: number): Observable<any> {
    let params = new HttpParams()
      .set('PageNumber', pageIndex)
      .set('PageSize', pageSize);
    return this.httpClient.get<any>(this.API_URL + '/pagination', { params });
  }

  getById(id: number): Observable<Agendamento> {
    return this.httpClient.get<Agendamento>(this.API_URL + '/' + id);
  }

  create(agendamento: Agendamento) {
    return this.httpClient.post<Agendamento>(this.API_URL, agendamento);
  }

  delete(id: number) {
    return this.httpClient.delete(this.API_URL + '/' + id);
  }

  update(id: number, agendamento: Agendamento): Observable<Agendamento> {
    return this.httpClient.put<Agendamento>(
      this.API_URL + '/' + id,
      agendamento
    );
  }
}

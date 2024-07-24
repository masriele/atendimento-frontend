import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agendamento } from '../models/Agendamento';

@Injectable({
  providedIn: 'root',
})
export class AgendamentoService {
  private API_URL = 'http://localhost:5210/Agendamento';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Agendamento[]> {
    return this.httpClient.get<Agendamento[]>(this.API_URL);
  }
}

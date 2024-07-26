import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}

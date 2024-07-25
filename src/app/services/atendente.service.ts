import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}

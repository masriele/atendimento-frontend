import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private API_URL = 'http://localhost:5210/Paciente';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Paciente[]> {
    return this.httpClient.get<Paciente[]>(this.API_URL);
  }
}

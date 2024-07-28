import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getAllPaginated(pageIndex: number, pageSize: number): Observable<any> {
    let params = new HttpParams()
      .set('PageNumber', pageIndex)
      .set('PageSize', pageSize);
    return this.httpClient.get<any>(this.API_URL + '/pagination', { params });
  }

  getById(id: number): Observable<Paciente> {
    return this.httpClient.get<Paciente>(this.API_URL + '/' + id);
  }

  create(paciente: Paciente) {
    return this.httpClient.post<Paciente>(this.API_URL, paciente);
  }

  delete(id: number) {
    return this.httpClient.delete(this.API_URL + '/' + id);
  }

  update(id: number, paciente: Paciente): Observable<Paciente> {
    return this.httpClient.put<Paciente>(
      this.API_URL + '/' + id,
      paciente
    );
  }
}

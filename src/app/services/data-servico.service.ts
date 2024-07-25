import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}

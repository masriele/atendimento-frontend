import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private API_URL = 'http://localhost:5210/Usuario';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.API_URL);
  }

  create(usuario: Usuario) {
    return this.httpClient.post<Usuario>(this.API_URL, usuario);
  }
}

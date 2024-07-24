import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://localhost:5210/Auth/login';
  private token = '';

  constructor(private httpClient: HttpClient) {}

  login(email: string, senha: string): Observable<any> {
    return this.httpClient
      .post<any>(this.API_URL, { email, senha })
      .pipe(tap((t) => (this.token = t.token)));
  }

  getAuthorizationToken() {
    return this.token;
  }

  logout(): void {
    this.token = '';
  }
}

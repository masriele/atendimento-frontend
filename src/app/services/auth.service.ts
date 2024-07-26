import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://localhost:5210/Auth/login';
  private tokenKey = 'authToken';
  private userNameKey = 'authUserName';

  constructor(private httpClient: HttpClient) {}

  login(email: string, senha: string): Observable<any> {
    return this.httpClient
      .post<any>(this.API_URL, { email, senha })
      .pipe(
        tap((response) => this.setToken(response.token, response.user.nome))
      );
  }

  private setToken(token: string, userName: string): void {
    if (window.localStorage) {
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(this.userNameKey, userName);
    }
  }

  logout(callback: () => void): void {
    if (window.localStorage) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userNameKey);
      callback();
    }
  }
}

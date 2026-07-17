import { Injectable } from '@angular/core';
import { BaseHttpService } from '../data-access/base-http.service';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/login';
import { ServiceResponse } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseHttpService {

  login(dados: LoginRequest): Observable<ServiceResponse<LoginResponse>> {
    return this.http.post<ServiceResponse<LoginResponse>>(`${this.apiUrl}/api/auth/login`, dados).pipe(
      tap(res => {
        if (res.dados) {
          localStorage.setItem('token', res.dados.token);
          localStorage.setItem('nome', res.dados.nome);
          localStorage.setItem('email', res.dados.email);
          localStorage.setItem('roles', JSON.stringify(res.dados.roles));
          localStorage.setItem('departamento', res.dados.departamento);
          localStorage.setItem('ramal', res.dados.ramal.toString());
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('nome');
    localStorage.removeItem('email');
    localStorage.removeItem('roles');
    localStorage.removeItem('departamento');
    localStorage.removeItem('ramal');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRoles(): string[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }

  getNome(): string | null {
    return localStorage.getItem('nome');
  }

  getEmail(): string | null {
    return localStorage.getItem('email');
  }

  getDepartamento(): string | null {
    return localStorage.getItem('departamento');
  }

  getRamal(): string | null {
    return localStorage.getItem('ramal');
  }

  isAdmin(): boolean {
    return this.getRoles().includes('Admin');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
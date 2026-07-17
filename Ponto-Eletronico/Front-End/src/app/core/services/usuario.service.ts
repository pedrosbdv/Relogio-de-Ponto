import { Injectable, inject } from '@angular/core';

import { BaseHttpService } from '../data-access/base-http.service';
import { CadastroUsuario, Usuario, AlterarSenhaDto } from '../models/usuario';
import { ServiceResponse } from '../models/usuario';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService extends BaseHttpService {

  cadastrarUsuario(usuario: CadastroUsuario): Observable<ServiceResponse<Usuario>> {
    return this.http.post<ServiceResponse<Usuario>>(`${this.apiUrl}/api/usuarios`, usuario);
  }

  pesquisarUsuario(filters: any): Observable<ServiceResponse<Usuario[]>> {

    let params = new HttpParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        params = params.set(key, value as string);
      }
    });

    return this.http.get<ServiceResponse<Usuario[]>>(`${this.apiUrl}/api/usuarios`, { params });
  }

  pesquisarUsuarioPeloId(id: number): Observable<ServiceResponse<Usuario>> {
    return this.http.get<ServiceResponse<Usuario>>(`${this.apiUrl}/api/usuarios/${id}`);
  }

  alterarSenha(dados: AlterarSenhaDto): Observable<ServiceResponse<boolean>> {
    return this.http.put<ServiceResponse<boolean>>(`${this.apiUrl}/api/usuarios/alterar-senha`, dados);
  }

  atualizarUsuario(data: Usuario): Observable<ServiceResponse<Usuario[]>> {
    return this.http.put<ServiceResponse<Usuario[]>>(`${this.apiUrl}/api/usuarios`,data);
  }

  baixarUsuario(id:number){
    return this.http.delete<any>(`${this.apiUrl}/api/usuarios/${id}`);
  }
}
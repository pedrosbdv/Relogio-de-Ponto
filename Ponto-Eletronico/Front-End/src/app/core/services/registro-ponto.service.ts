import { Injectable } from '@angular/core';
import { BaseHttpService } from '../data-access/base-http.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RegistroPontoService extends BaseHttpService {

  registrarEntrada(): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/registro-ponto`, {});
  }

  registrarSaida(): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/registro-ponto/saida`, {});
  }

  pesquisarPontos(dataInicio?: string, dataFim?: string): Observable<any> {
    let params = new HttpParams();
    if (dataInicio) {
      params = params.set('dataInicio', dataInicio);
    }
    if (dataFim) {
      params = params.set('dataFim', dataFim);
    }

    return this.http.get(`${this.apiUrl}/api/registro-ponto`, { params });
  }

  buscarPontoHoje(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/registro-ponto/ponto-hoje`);
  }

  // Consulta exclusiva do Admin: todos os funcionários, filtrando por nome e período
  pesquisarPontosAdmin(nome?: string, dataInicio?: string, dataFim?: string): Observable<any> {
    let params = new HttpParams();
    if (nome) {
      params = params.set('nome', nome);
    }
    if (dataInicio) {
      params = params.set('dataInicio', dataInicio);
    }
    if (dataFim) {
      params = params.set('dataFim', dataFim);
    }

    return this.http.get(`${this.apiUrl}/api/registro-ponto/admin`, { params });
  }
}
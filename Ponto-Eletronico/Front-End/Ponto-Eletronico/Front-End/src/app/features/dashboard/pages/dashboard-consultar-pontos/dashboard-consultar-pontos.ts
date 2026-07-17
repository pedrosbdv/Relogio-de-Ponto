import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardTable } from '../../components/dashboard-table/dashboard-table';
import { DashboardCardFilter } from '../../components/dashboard-card-filter/dashboard-card-filter';
import { Buttons } from '../../../../shared/components/buttons/buttons';
import { Inputs } from '../../../../shared/components/input/input';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PONTOS_TABLE_COLUMNS } from '../../shared/config/dashboard-table-headers';
import { RegistroPontoService } from '../../../../core/services/registro-ponto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-consultar-pontos',
  imports: [CommonModule, DashboardTable, DashboardCardFilter, Buttons, Inputs, ReactiveFormsModule],
  templateUrl: './dashboard-consultar-pontos.html',
  styleUrl: './dashboard-consultar-pontos.scss',
})
export class DashboardConsultarPontos implements OnInit {

  private readonly registroPontoService = inject(RegistroPontoService);
  private readonly fb = inject(FormBuilder);

  form: FormGroup;
  columns = PONTOS_TABLE_COLUMNS;
  registros$: Observable<any[]> = of([]);

  constructor() {
    this.form = this.fb.group({
      nome: [''],
      dataInicio: [''],
      dataFim: [''],
    });
  }

  ngOnInit(): void {
    this.pesquisarPontos();
  }

  // Pesquisa os pontos de todos os funcionários, filtrando por nome e período
  pesquisarPontos(): void {

    const nome = this.form.get('nome')?.value || undefined;
    const dataInicio = this.form.get('dataInicio')?.value || undefined;
    const dataFim = this.form.get('dataFim')?.value || undefined;

    this.registros$ = this.registroPontoService
      .pesquisarPontosAdmin(nome, dataInicio, dataFim)
      .pipe(
        map((response) => response.dados ?? []),
        catchError(() => {
          Swal.fire('Erro', 'Não foi possível carregar os registros.', 'error');
          return of([]);
        }),
      );

  }

}
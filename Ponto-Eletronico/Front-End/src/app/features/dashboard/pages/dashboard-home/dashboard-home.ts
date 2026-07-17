import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, of, interval, Subscription } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { RegistroPontoService } from '../../../../core/services/registro-ponto.service';

import { DashboardTable } from '../../components/dashboard-table/dashboard-table';
import { DashboardCardFilter } from '../../components/dashboard-card-filter/dashboard-card-filter';
import { Buttons } from '../../../../shared/components/buttons/buttons';
import { Inputs } from '../../../../shared/components/input/input';

import { HOME_TABLE_COLUMNS } from '../../shared/config/dashboard-table-headers';



type StatusPonto = 'carregando' | 'entrada' | 'saida' | 'finalizada';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardTable,
    DashboardCardFilter,
    Buttons,
    Inputs,
  ],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.scss',
})
export class DashboardHome implements OnInit, OnDestroy {

  //==========================================================================
  // Formulário de pesquisa
  //==========================================================================

  form: FormGroup;

  //==========================================================================
  // Relógio
  //==========================================================================

  horaAtual = '';
  dataAtual = '';

  private relogioSubscription?: Subscription;

  //==========================================================================
  // Estado da tela
  //==========================================================================

  readonly statusPonto = signal<StatusPonto>('carregando');

  columns = HOME_TABLE_COLUMNS;

  registros$!: Observable<any[]>;

  constructor(
    private registroPontoService: RegistroPontoService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {

    this.form = this.fb.group({
      dataInicio: [''],
      dataFim: [''],
    });

  }

  //==========================================================================
  // Inicialização do componente
  //==========================================================================

  ngOnInit(): void {
    this.iniciarRelogio();
    this.carregarPontoHoje();
    this.carregarRegistros();
  }

  //==========================================================================
  // Libera recursos ao destruir o componente
  //==========================================================================

  ngOnDestroy(): void {
    this.relogioSubscription?.unsubscribe();
  }

  //==========================================================================
  // Inicializa o relógio da tela
  //==========================================================================

  private iniciarRelogio(): void {
    this.atualizarDataHora();
    this.relogioSubscription = interval(1000).subscribe(() => {
      this.atualizarDataHora();
    });
  }

  //==========================================================================
  // Atualiza data e hora do cabeçalho
  //==========================================================================

  private atualizarDataHora(): void {
    const agora = new Date();
    this.horaAtual = agora.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    this.dataAtual = agora.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    this.cdr.detectChanges();
  }

  //==========================================================================
  // Registra entrada ou saída
  //==========================================================================

  registrarPonto(tipo: 'entrada' | 'saida'): void {

    const texto =
      tipo === 'entrada'
        ? 'Você tem certeza que deseja registrar sua entrada?'
        : 'Você tem certeza que deseja registrar sua saída?';

    Swal.fire({
      text: texto,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim, registrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }
      if (tipo === 'entrada') {
        this.registroPontoService.registrarEntrada().subscribe({
          next: () => {
            Swal.fire(
              'Sucesso',
              'Entrada registrada com sucesso!',
              'success'
            );
            this.carregarPontoHoje();
            this.carregarRegistros();
          },
          error: () => {
            Swal.fire(
              'Erro',
              'Não foi possível registrar a entrada.',
              'error'
            );
          }
        });
        return;
      }

      this.registroPontoService.registrarSaida().subscribe({
        next: () => {
          Swal.fire(
            'Sucesso',
            'Saída registrada com sucesso!',
            'success'
          );
          this.carregarPontoHoje();
          this.carregarRegistros();
        },

        error: () => {
          Swal.fire(
            'Erro',
            'Não foi possível registrar a saída.',
            'error'
          );
        }

      });

    });

  }

  //==========================================================================
  // Pesquisa os registros conforme o período informado
  //==========================================================================

  carregarRegistros(): void {

    const dataInicio = this.form.get('dataInicio')?.value || undefined;
    const dataFim = this.form.get('dataFim')?.value || undefined;

    this.registros$ = this.registroPontoService
      .pesquisarPontos(dataInicio, dataFim)
      .pipe(
        map(response => response.dados ?? []),
        catchError(() => of([]))
      );

  }

  //==========================================================================
  // Verifica a situação do ponto do dia
  //==========================================================================

  carregarPontoHoje(): void {
    this.registroPontoService.buscarPontoHoje().subscribe({
      next: (response) => {
        const ponto = response.dados;
        if (!ponto) {
          this.statusPonto.set('entrada');
          return;
        }

        if (!ponto.dataHoraSaida) {
          this.statusPonto.set('saida');
          return;
        }
        this.statusPonto.set('finalizada');
      },

      error: () => {
        this.statusPonto.set('entrada');
      }

    });

  }

  //==========================================================================
  // Gera e baixa um arquivo CSV com os registros atualmente carregados
  //==========================================================================

  gerarCsv(): void {

    this.registroPontoService
      .pesquisarPontos(
        this.form.get('dataInicio')?.value || undefined,
        this.form.get('dataFim')?.value || undefined,
      )
      .subscribe({
        next: (response) => {
          const registros = response.dados ?? [];

          if (registros.length === 0) {
            Swal.fire('Atenção', 'Não há registros para exportar.', 'warning');
            return;
          }

          this.baixarCsv(registros);
        },
        error: () => {
          Swal.fire('Erro', 'Não foi possível gerar o CSV.', 'error');
        }
      });

  }

  //==========================================================================
  // Monta o conteúdo do CSV e dispara o download no navegador
  //==========================================================================

  private baixarCsv(registros: any[]): void {

    const cabecalho = ['Data', 'Entrada', 'Saída'];

    const linhas = registros.map((registro) => {

      const data = registro.dataHoraEntrada
        ? new Date(registro.dataHoraEntrada).toLocaleDateString('pt-BR')
        : '';

      const entrada = registro.dataHoraEntrada
        ? new Date(registro.dataHoraEntrada).toLocaleTimeString('pt-BR')
        : 'Em aberto';

      const saida = registro.dataHoraSaida
        ? new Date(registro.dataHoraSaida).toLocaleTimeString('pt-BR')
        : 'Em aberto';

      return [data, entrada, saida].join(';');

    });

    const conteudoCsv = [cabecalho.join(';'), ...linhas].join('\n');

    // BOM (\uFEFF) garante acentuação correta ao abrir no Excel
    const blob = new Blob(['\uFEFF' + conteudoCsv], { type: 'text/csv;charset=utf-8;' });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `registro-ponto-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    window.URL.revokeObjectURL(url);

  }

}
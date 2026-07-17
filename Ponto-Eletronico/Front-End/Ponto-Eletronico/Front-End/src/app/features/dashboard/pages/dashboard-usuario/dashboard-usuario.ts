import { Component, OnInit, inject } from '@angular/core';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { DashboardTable } from '../../components/dashboard-table/dashboard-table';
import { Select } from '../../../../shared/components/select/select';
import { DashboardCardFilter } from '../../components/dashboard-card-filter/dashboard-card-filter';
import { Buttons } from '../../../../shared/components/buttons/buttons';
import { Inputs } from '../../../../shared/components/input/input';
import { EditUsuarioModal } from '../../modal/edit-usuario-modal/edit-usuario-modal';
import { AddUsuarioModal } from '../../modal/add-usuario-modal/add-usuario-modal';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { USUARIO_TABLE_COLUMNS } from '../../shared/config/dashboard-table-headers';
import { Usuario } from '../../../../core/models/usuario';

@Component({
  selector: 'app-dashboard-usuario',
  imports: [CommonModule,NgbModalModule,DashboardTable,DashboardCardFilter,Buttons,Inputs,Select,ReactiveFormsModule  ],
  templateUrl: './dashboard-usuario.html',
  styleUrl: './dashboard-usuario.scss',
})
export class DashboardUsuario implements OnInit {

  // Lista de usuários exibida na tabela
  registros$!: Observable<Usuario[]>;

  // Configuração das colunas da tabela
  columns = USUARIO_TABLE_COLUMNS;

  // Formulário de filtros da pesquisa
  form!: FormGroup;

  // Serviços utilizados pelo componente
  private readonly modalService = inject(NgbModal);
  private readonly fb = inject(FormBuilder);
  private readonly usuarioService = inject(UsuarioService);


  constructor() {

    // Inicializa o formulário de pesquisa
    this.form = this.fb.group({
      nome: [''],
      departamento: [''],
      ramal: [''],
    });
  }

  // Carrega os usuários ao abrir a tela
  ngOnInit(): void {
    this.pesquisarUsuario();
  }

  // Pesquisa os usuários conforme os filtros informados
  pesquisarUsuario(): void {
    const filtros = this.form.getRawValue();
    this.registros$ = this.usuarioService.pesquisarUsuario(filtros).pipe(
      map((response) => response.dados ?? []),
      catchError(() => {
        Swal.fire('Erro', 'Não foi possível carregar os usuários.', 'error');
        return of([]);
      }),
    );
  }

  // Abre o modal para cadastro de um novo usuário
  addUsuario(): void {
    const modalRef = this.modalService.open(AddUsuarioModal, { centered: true });

    // Atualiza a tabela após o cadastro
    modalRef.closed.subscribe((result) => {
      if (result === 'success') {
        this.pesquisarUsuario();
      }
    });
  }

  // Abre o modal para edição do usuário selecionado
  editarUsuario(usuario: Usuario): void {
    const modalRef = this.modalService.open(EditUsuarioModal, { centered: true });
    // Envia o Id do usuário para o modal
    modalRef.componentInstance.idUsuario = usuario.id;

    // Atualiza a tabela após a edição
    modalRef.closed.subscribe((result) => {
      if (result === 'success') {
        this.pesquisarUsuario();
      }
    });
  }

  // Inativa o usuário selecionado
  baixarUsuario(usuario: Usuario): void {
    Swal.fire({
      text: `Você tem certeza que deseja inativar ${usuario.nome}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim, inativar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {

        // Envia a solicitação de inativação para a API
        this.usuarioService.baixarUsuario(usuario.id).subscribe({
          next: () => {
            Swal.fire('Sucesso', 'Usuario baixado com sucesso', 'success');
            location.reload();
          },
          error: () => {
            Swal.fire('Erro', 'Não foi possível inativar o usuário.', 'error');
          },
        });
      }
    });
  }
}

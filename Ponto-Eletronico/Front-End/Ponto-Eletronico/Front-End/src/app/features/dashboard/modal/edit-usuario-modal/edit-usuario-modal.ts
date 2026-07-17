import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { Select } from '../../../../shared/components/select/select';
import { FormValidationService } from '../../../../shared/services/form-validation.service';
import { Inputs } from '../../../../shared/components/input/input';
import { Buttons } from '../../../../shared/components/buttons/buttons';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-usuario-modal',
  imports: [CommonModule, NgbModalModule, ReactiveFormsModule, Inputs, Buttons, Select],
  templateUrl: './edit-usuario-modal.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './edit-usuario-modal.scss',
})
export class EditUsuarioModal implements OnInit {
  @Input()
  idUsuario!: number;

  form!: FormGroup;
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService,  public activeModal: NgbActiveModal, private formValidation: FormValidationService)
  {
    this.form  = this.fb.group({
      id: [0],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      departamento: ['', Validators.required],
      role: ['', Validators.required],
      ramal: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.carregarUsuario();
  }

  carregarUsuario(): void {
    this.usuarioService.pesquisarUsuarioPeloId(this.idUsuario).subscribe({
      next: (response) => {
        const usuario = response.dados;

        this.form.patchValue({
          id: usuario.id,
          role: usuario.role,
          nome: usuario.nome,
          email: usuario.email,
          departamento: usuario.departamento,
          ramal: usuario.ramal,
        });
      },

      error: () => {
        Swal.fire('Erro', 'Não foi possível carregar o usuário.', 'error');
      },
    });
  }

  editarUsuario(): void {

    if(this.form.invalid){
      this.form.markAllAsTouched();
      const message = this.formValidation.getFirstError(this.form);
      Swal.fire({
        icon:'warning',
        title:'Atenção',
        text: message ?? 'Verifique os campos.'
      });
      return;
    }

    Swal.fire({
      text: 'Você tem certeza que deseja editar este usuário?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim, editar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      this.usuarioService.atualizarUsuario(this.form.getRawValue()).subscribe({
        next: (response) => {
          Swal.fire('Sucesso', response.mensagem, 'success').then(() => {
            this.activeModal.close('success');
            location.reload();
            return;
          });
        },

        error: (error) => {
          Swal.fire('Erro', error.error?.mensagem ?? 'Erro ao atualizar.', 'error');
        },
      });
    });
  }
}

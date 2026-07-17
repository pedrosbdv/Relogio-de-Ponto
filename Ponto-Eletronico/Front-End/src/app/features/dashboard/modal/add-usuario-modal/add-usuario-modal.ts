import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  NgbActiveModal,
  NgbModalModule,
} from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';

import { UsuarioService } from '../../../../core/services/usuario.service';
import { FormValidationService } from '../../../../shared/services/form-validation.service';
import { PasswordValidator } from '../../../../shared/validators/password.validator';
import { Buttons } from '../../../../shared/components/buttons/buttons';
import { Inputs } from '../../../../shared/components/input/input';
import { Select } from '../../../../shared/components/select/select';

@Component({
  selector: 'app-add-usuario-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModalModule,
    Inputs,
    Buttons,
    Select,
  ],
  templateUrl: './add-usuario-modal.html',
  styleUrl: './add-usuario-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUsuarioModal {

  // ===========================================================================
  // Serviços utilizados pelo componente
  // ===========================================================================

  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private formValidation = inject(FormValidationService);

  public activeModal = inject(NgbActiveModal);

  // ===========================================================================
  // Formulário de cadastro
  // ===========================================================================

  form: FormGroup = this.fb.group({

    nome: ['', Validators.required],

    email: [
      '',
      [
        Validators.required,
        Validators.email,
      ],
    ],

    departamento: ['', Validators.required],

    ramal: ['', Validators.required],

    role: ['', Validators.required],

    senha: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        PasswordValidator.identity(),
      ],
    ],

    confirmarSenha: ['', Validators.required],

  });

  // ===========================================================================
  // Cadastro de usuário
  // ===========================================================================

  cadastrarUsuario(): void {

    // Validação dos campos obrigatórios
    if (this.form.invalid) {

      this.form.markAllAsTouched();

      const message = this.formValidation.getFirstError(this.form);

      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: message ?? 'Verifique os campos.',
      });

      return;
    }

    const { senha, confirmarSenha } = this.form.getRawValue();

    // Verifica se as senhas são iguais
    if (senha !== confirmarSenha) {

      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'As senhas não coincidem.',
      });

      return;
    }

    // Confirmação do cadastro
    Swal.fire({
      text: 'Você tem certeza que deseja cadastrar este usuário?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim, cadastrar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    }).then((result) => {

      if (!result.isConfirmed) {
        return;
      }

      const {
        nome,
        email,
        senha,
        departamento,
        ramal,
        role,
      } = this.form.getRawValue();

      // Envia os dados para a API
      this.usuarioService
        .cadastrarUsuario({
          nome,
          email,
          senha,
          departamento: Number(departamento),
          ramal,
          role,
        })
        .subscribe({

          next: (response) => {

            Swal.fire({
              icon: 'success',
              title: 'Sucesso',
              text: response.mensagem ?? 'Usuário cadastrado com sucesso!',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: 'btn btn-success',
              },
              buttonsStyling: false,
            }).then(() => {
              this.activeModal.close(true);
              location.reload();
            });
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Erro',
              text: error.error?.mensagem ?? 'Não foi possível cadastrar o usuário.',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: 'btn btn-danger',
              },
              buttonsStyling: false,
            });
          },
        });
    });

  }

}
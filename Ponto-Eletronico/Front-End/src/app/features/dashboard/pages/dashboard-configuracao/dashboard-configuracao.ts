import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Buttons } from '../../../../shared/components/buttons/buttons';
import { DashboardCardFilter } from '../../components/dashboard-card-filter/dashboard-card-filter';
import { AuthService } from '../../../../core/services/auth.service';
import { Inputs } from '../../../../shared/components/input/input';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { AlterarSenhaDto } from '../../../../core/models/usuario';
import { FormValidationService } from '../../../../shared/services/form-validation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-configuracao',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Buttons,
    DashboardCardFilter,
    Inputs
  ],
  templateUrl: './dashboard-configuracao.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './dashboard-configuracao.scss',
})
export class DashboardConfiguracao {

  private readonly authService = inject(AuthService);
  private readonly usuarioService = inject(UsuarioService);
  private readonly formValidation = inject(FormValidationService);
  private readonly fb = inject(FormBuilder);

  nomeUsuario = this.authService.getNome();
  emailUsuario = this.authService.getEmail();
  departamentoUsuario = this.authService.getDepartamento();
  ramalUsuario = this.authService.getRamal();

  formAlterarSenha = this.fb.group({
    senhaAtual: ['', Validators.required],
    novaSenha: ['', [Validators.required, Validators.minLength(6)]],
    confirmarSenha: ['', Validators.required]
  });

  alterarSenha(): void {

    // Verifica se todos os campos foram preenchidos corretamente,
    // mostrando a mensagem de erro específica do primeiro campo inválido
    if (this.formAlterarSenha.invalid) {
      this.formAlterarSenha.markAllAsTouched();
      const message = this.formValidation.getFirstError(this.formAlterarSenha);
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: message ?? 'Verifique os campos.'
      });
      return;
    }

    const dados = this.formAlterarSenha.getRawValue() as AlterarSenhaDto;

    // Garante que a nova senha e a confirmação sejam iguais
    if (dados.novaSenha !== dados.confirmarSenha) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'As senhas não conferem.'
      });
      return;
    }

    // Solicita confirmação antes de efetivar a troca de senha
    Swal.fire({
      text: 'Deseja realmente alterar sua senha?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim, alterar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (!result.isConfirmed) {
        return;
      }

      this.usuarioService.alterarSenha(dados).subscribe({

        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: response.mensagem
          });

          this.formAlterarSenha.reset();
        },

        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: error.error?.mensagem ?? 'Não foi possível alterar a senha.'
          });
        }

      });

    });

  }

}
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Select } from '../../../shared/components/select/select';
import { UsuarioService } from '../../../core/services/usuario.service';
import { FormValidationService } from '../../../shared/services/form-validation.service';
import { Inputs } from '../../../shared/components/input/input';
import { Buttons } from '../../../shared/components/buttons/buttons';
import { PasswordValidator } from '../../../shared/validators/password.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, Inputs, Buttons, Select],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro {

  // Serviços utilizados pelo componente
  private usuarioService = inject(UsuarioService);
  private formValidation = inject(FormValidationService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  // Formulário de cadastro de usuário
  form: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, PasswordValidator.identity(), Validators.minLength(6)]],
    confirmarSenha: ['', Validators.required],
    departamento: ['', Validators.required],
    ramal: ['', Validators.required],
    role: ['', Validators.required],
  });

  // Realiza o cadastro de um novo usuário
  onSubmit(): void {

    // Verifica se todos os campos obrigatórios foram preenchidos corretamente
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

    // Garante que a confirmação da senha seja igual à senha informada
    if (senha !== confirmarSenha) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'As senhas não coincidem.',
      });
      return;
    }

    // Solicita confirmação antes de criar a conta
    Swal.fire({
      text: 'Você tem certeza que deseja criar esta conta?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim, criar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      const { nome, email, senha, departamento, role, ramal } = this.form.getRawValue();

      // Envia os dados para criação do usuário
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
            Swal.fire('Sucesso', response.mensagem ?? 'Conta criada com sucesso!', 'success').then(() => {
              this.router.navigate(['/login']);
            });
          },
          error: (error) => {
            Swal.fire('Erro', error.error?.mensagem ?? 'Erro ao criar conta.', 'error');
          },
        });
    });
  }
}
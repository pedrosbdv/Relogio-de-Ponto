import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormValidationService } from '../../../shared/services/form-validation.service';
import { Buttons } from '../../../shared/components/buttons/buttons';
import { Inputs } from '../../../shared/components/input/input';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, Inputs, Buttons],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  // Serviços utilizados pelo componente
  private authService = inject(AuthService);
  private formValidation = inject(FormValidationService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  // Formulário de autenticação
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required],
  });

  // Realiza o processo de autenticação do usuário
  onSubmit(): void {

    // Valida os campos obrigatórios antes de enviar a requisição
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

    const { email, senha } = this.form.getRawValue();

    // Envia as credenciais para autenticação
    this.authService.login({ email, senha }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        Swal.fire('Erro', error.error?.mensagem ?? 'Email ou senha inválidos.', 'error');
      }
    });
  }
}
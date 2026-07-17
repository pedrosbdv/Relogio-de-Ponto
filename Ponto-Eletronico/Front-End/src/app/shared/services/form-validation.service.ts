import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormMessages } from '../validators/form-messages';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {

  /**
   * Percorre todos os campos do formulário e retorna
   * a primeira mensagem de erro encontrada.
   */
  getFirstError(form: FormGroup): string | null {

    // Percorre todos os controles do formulário
    for (const field of Object.keys(form.controls)) {

      const control = form.get(field);

      // Verifica se o campo possui algum erro de validação
      if (control?.errors) {

        // Campo obrigatório não preenchido
        if (control.errors['required']) {
          return FormMessages.required(field);
        }

        // Formato de e-mail inválido
        if (control.errors['email']) {
          return FormMessages.email();
        }

        // Erro personalizado de e-mail inválido
        if (control.errors['emailInvalido']) {
          return FormMessages.email();
        }

        // Quantidade mínima de caracteres não atendida
        if (control.errors['minlength']) {
          return FormMessages.minlength(
            field,
            control.errors['minlength'].requiredLength
          );
        }

        // Senha sem letra maiúscula
        if (control.errors['uppercase']) {
          return FormMessages.passwordUppercase();
        }

        // Senha sem letra minúscula
        if (control.errors['lowercase']) {
          return FormMessages.passwordLowercase();
        }

        // Senha sem número
        if (control.errors['number']) {
          return FormMessages.passwordNumber();
        }

        // Senha sem caractere especial
        if (control.errors['special']) {
          return FormMessages.passwordSpecial();
        }
      }
    }

    // Nenhum erro encontrado
    return null;
  }
}
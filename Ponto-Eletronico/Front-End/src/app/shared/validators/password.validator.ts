import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidator {

  /**
   * Validador personalizado para senhas.
   * Verifica se a senha atende aos requisitos
   * mínimos definidos pela aplicação.
   */
  static identity(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

      // Obtém o valor informado no campo
      const senha = control.value as string;

      // Caso o campo esteja vazio, a responsabilidade
      // da validação fica com o Validators.required
      if (!senha) {
        return null;
      }

      // Verifica se a senha possui pelo menos uma letra maiúscula
      if (!/[A-Z]/.test(senha)) {
        return { uppercase: true };
      }

      // Verifica se a senha possui pelo menos uma letra minúscula
      if (!/[a-z]/.test(senha)) {
        return { lowercase: true };
      }

      // Verifica se a senha possui pelo menos um número
      if (!/[0-9]/.test(senha)) {
        return { number: true };
      }

      // Verifica se a senha possui pelo menos um caractere especial
      if (!/[^a-zA-Z0-9]/.test(senha)) {
        return { special: true };
      }

      // Verifica se a senha possui no mínimo 6 caracteres
      if (senha.length < 6) {
        return {
          minlength: {
            requiredLength: 6,
          },
        };
      }

      // Senha válida
      return null;

    };

  }

}
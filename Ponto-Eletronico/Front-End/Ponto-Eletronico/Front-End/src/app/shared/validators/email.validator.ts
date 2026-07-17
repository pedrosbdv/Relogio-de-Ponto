import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Validador personalizado para verificar
 * se o e-mail informado possui um formato válido.
 */
export function emailValidator(control: AbstractControl): ValidationErrors | null {

  // Obtém o valor informado no campo
  const value = control.value;

  // Caso o campo esteja vazio, a responsabilidade
  // da validação fica com o Validators.required
  if (!value) {
    return null;
  }

  // Expressão regular utilizada para validar o formato do e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Retorna null caso o e-mail seja válido,
  // caso contrário retorna o erro personalizado
  return emailRegex.test(value)
    ? null
    : { emailInvalido: true };
}
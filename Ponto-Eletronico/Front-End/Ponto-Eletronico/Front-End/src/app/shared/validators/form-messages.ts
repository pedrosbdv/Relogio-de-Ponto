export const FormMessages = {

  required(field: string): string {
    return `O campo ${field} é obrigatório.`;
  },

  email(): string {
    return 'Por favor, verifique o e-mail informado.';
  },

  minlength(field: string, length: number): string {
    return `O campo ${field} deve possuir no mínimo ${length} caracteres.`;
  },

  passwordUppercase(): string {
    return 'A senha deve possuir pelo menos uma letra maiúscula.';
  },

  passwordLowercase(): string {
    return 'A senha deve possuir pelo menos uma letra minúscula.';
  },

  passwordNumber(): string {
    return 'A senha deve possuir pelo menos um número.';
  },

  passwordSpecial(): string {
    return 'A senha deve possuir pelo menos um caractere especial.';
  },

};

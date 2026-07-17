export class Usuario
{
  id!: number;
  nome!: string;
  email!: string;
  ramal!: string;
  departamento!: string;
  departamentoDescricao!: string;
  senha!: string;
  role!: string;
}

export interface CadastroUsuario {
  nome: string;
  email: string;
  senha: string;
  departamento: number;
  ramal: number;
  role: string;
}

export interface AlterarSenhaDto {
  senhaAtual: string;
  novaSenha: string;
  confirmarSenha: string;
}

export interface ServiceResponse<T> {
  dados: T;
  mensagem: string;
  sucesso: boolean;
}

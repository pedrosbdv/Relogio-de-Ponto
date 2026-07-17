import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard responsável por validar se o usuário possui uma das
 * roles necessárias para acessar determinada rota.
 *
 * As roles permitidas devem ser informadas na configuração da rota:
 *
 * data: {
 *   roles: ['Admin']
 * }
 */
export const RoleGuard: CanActivateFn = (route) => {
  // Injeta os serviços necessários
  const authService = inject(AuthService);
  const router = inject(Router);

  // Obtém as roles permitidas definidas na rota
  const rolesPermitidas = route.data?.['roles'] as string[] | undefined;

  // Caso nenhuma role tenha sido definida, permite o acesso
  if (!rolesPermitidas || rolesPermitidas.length === 0) {
    return true;
  }

  // Recupera as roles do usuário autenticado
  const rolesDoUsuario = authService.getRoles();

  // Verifica se o usuário possui pelo menos uma das roles permitidas
  const temPermissao = rolesPermitidas.some(role =>
    rolesDoUsuario
      .map(r => r.toUpperCase())
      .includes(role.toUpperCase())
  );

  // Se possuir permissão, libera o acesso à rota
  if (temPermissao) {
    return true;
  }

  // Caso contrário, redireciona para o dashboard
  router.navigate(['/dashboard']);
  return false;
};
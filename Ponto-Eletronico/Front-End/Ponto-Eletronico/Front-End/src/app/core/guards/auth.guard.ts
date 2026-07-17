import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard responsável por verificar se o usuário está autenticado.
 *
 * Caso o usuário possua um token válido, o acesso à rota é permitido.
 * Caso contrário, o usuário é redirecionado para a tela de login.
 */
export const AuthGuard: CanActivateFn = () => {
  // Injeta os serviços necessários
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verifica se o usuário está autenticado
  if (authService.isLoggedIn()) {
    return true;
  }

  // Caso não esteja autenticado, redireciona para a página de login
  router.navigate(['/login']);
  return false;
};
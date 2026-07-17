import { Routes } from '@angular/router';

export const routes: Routes =
[

  // ============================================================================
  // Rota inicial
  // Redireciona o usuário para a tela de login.
  // ============================================================================

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // ============================================================================
  // Rotas públicas
  // ============================================================================

  {
    path: '',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)  
  },

  // ============================================================================
  // Rotas autenticadas
  // ============================================================================

  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
  },

  // ============================================================================
  // Rota não encontrada
  // Qualquer URL inválida será redirecionada para o login.
  // ============================================================================

  {
    path: '**',
    redirectTo: 'login'
  }

];

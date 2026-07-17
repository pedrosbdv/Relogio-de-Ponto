import { Routes } from '@angular/router';
import { DashboardLayout } from './dashboard-layout/dashboard-layout';
import { DashboardHome } from './pages/dashboard-home/dashboard-home';
import { DashboardUsuario } from './pages/dashboard-usuario/dashboard-usuario';
import { DashboardConfiguracao } from './pages/dashboard-configuracao/dashboard-configuracao';
import { DashboardConsultarPontos } from './pages/dashboard-consultar-pontos/dashboard-consultar-pontos';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RoleGuard } from '../../core/guards/role.guard';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardLayout,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardHome
      },
      {
        path: 'usuarios',
        component: DashboardUsuario,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'consultar-pontos',
        component: DashboardConsultarPontos,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'perfil',
        component: DashboardConfiguracao
      }
    ]
  }
];
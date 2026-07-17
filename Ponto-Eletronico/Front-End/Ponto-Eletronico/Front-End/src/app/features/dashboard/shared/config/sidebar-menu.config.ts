import { SidebarGroup } from '../../components/dashboard-sidebar/dashboard-sidebar';

export const SIDEBAR_MENU: SidebarGroup[] = [
  {
    title: 'Menu',
    items: [
      {
        label: 'Registro de Ponto',
        icon: 'bi bi-clock-history',
        route: '/dashboard'
      }
    ]
  },
  {
    title: 'Administração',
    items: [
      {
        label: 'Cadastro de Usuários',
        icon: 'bi bi-people',
        route: '/dashboard/usuarios',
        roles: ['ADMIN']
      },
      {
        label: 'Consultar Pontos',
        icon: 'bi bi-calendar-check',
        route: '/dashboard/consultar-pontos',
        roles: ['ADMIN']
      }
    ]
  },
  {
    title: 'Opções',
    items: [
      {
        label: 'Configurações do Perfil',
        icon: 'bi bi-person-gear',
        route: '/dashboard/perfil'
      },
      {
        label: 'Sair',
        icon: 'bi bi-box-arrow-right',
        action: 'logout'
      }
    ]
  }
];
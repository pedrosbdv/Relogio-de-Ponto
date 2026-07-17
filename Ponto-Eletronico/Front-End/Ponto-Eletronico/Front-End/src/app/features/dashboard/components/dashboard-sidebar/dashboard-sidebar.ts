import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SIDEBAR_MENU } from '../../shared/config/sidebar-menu.config';
import { SidebarService } from '../../shared/service/sidebar.service';
import { AuthService } from '../../../../core/services/auth.service';

export interface SidebarItem {
  label: string;
  icon: string;
  route?: string;
  action?: 'logout';
  active?: boolean;
  roles?: string[];
}

export interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dashboard-sidebar.html',
  styleUrl: './dashboard-sidebar.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class DashboardSidebar {

  private readonly sidebarService = inject(SidebarService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly isOpen = this.sidebarService.isOpen;

  readonly menu = computed(() => {
    const rolesDoUsuario = this.authService.getRoles().map(r => r.toUpperCase());

    return SIDEBAR_MENU
      .map(group => ({
        ...group,
        items: group.items.filter(item => {
          if (!item.roles || item.roles.length === 0) {
            return true;
          }

          return item.roles.some(role =>
            rolesDoUsuario.includes(role.toUpperCase())
          );
        }),
      }))
      .filter(group => group.items.length > 0);
  });

  onMenuClick(item: SidebarItem): void {

    this.sidebarService.close();

    if (item.action === 'logout') {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  toggleSidebar(): void {
    this.sidebarService.toggle();
  }
}
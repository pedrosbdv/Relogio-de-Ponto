import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Buttons } from '../../../../shared/components/buttons/buttons';
import { SidebarService } from '../../shared/service/sidebar.service';
import { TemaService } from '../../shared/service/tema.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-navbar',
  imports: [Buttons, CommonModule],
  templateUrl: './dashboard-navbar.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './dashboard-navbar.scss',
})
export class DashboardNavbar {
  private readonly sidebarService = inject(SidebarService);
  protected readonly themeService = inject(TemaService);
  private readonly authService = inject(AuthService);

  nomeUsuario = this.authService.getNome();

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  toggleTheme() {
    this.themeService.toggle();
  }
}

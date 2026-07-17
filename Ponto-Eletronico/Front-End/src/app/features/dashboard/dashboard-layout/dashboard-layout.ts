import { Component, inject, OnInit, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardSidebar } from '../components/dashboard-sidebar/dashboard-sidebar';
import { DashboardNavbar } from '../components/dashboard-navbar/dashboard-navbar';
import { SidebarService } from '../shared/service/sidebar.service';
import { TemaService } from '../shared/service/tema.service';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, DashboardSidebar, DashboardNavbar],
  templateUrl: './dashboard-layout.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './dashboard-layout.scss',
})
export class DashboardLayout {
  private readonly sidebarService = inject(SidebarService);
  readonly isOpen = this.sidebarService.isOpen;
  protected readonly themeService = inject(TemaService);
}

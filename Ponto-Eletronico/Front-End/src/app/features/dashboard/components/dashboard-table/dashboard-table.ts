import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  field: string;
  header: string;
  type?: 'text' | 'badge';
}

export interface TableActions {
  edit?: boolean;
  delete?: boolean;
}

@Component({
  selector: 'app-dashboard-table',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './dashboard-table.html',
  styleUrl: './dashboard-table.scss',
})
export class DashboardTable {

  @Input()
  columns: TableColumn[] = [];


  @Input()
  actions: TableActions = {};


  get hasActions(): boolean {
    return Object.values(this.actions).some(value => value);
  }

}

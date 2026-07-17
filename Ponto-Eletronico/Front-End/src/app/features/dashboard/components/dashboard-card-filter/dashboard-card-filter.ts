import { Component, input } from '@angular/core';


@Component({
  selector: 'app-dashboard-card-filter',
  imports: [],
  templateUrl: './dashboard-card-filter.html',
  styleUrl: './dashboard-card-filter.scss',
})
export class DashboardCardFilter {
  title = input.required<string>();
  subtitle = input.required<string>();
}

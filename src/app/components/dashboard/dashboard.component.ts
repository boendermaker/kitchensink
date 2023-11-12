import { Component, Input, OnInit, Renderer2, inject } from '@angular/core';
import { IDashboard } from './dashboard.interface';
import { DashboardService } from './dashboard.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selectedDashboard: Partial<IDashboard> = {};

  constructor(
    public dashboardService: DashboardService
  ) {
  }

  ngOnInit(): void {
    this.handleSelectDashboard();
  }

  handleSelectDashboard(): void {
    this.dashboardService
    .selectedDashboard_
    .pipe(untilDestroyed(this))
    .subscribe({
      next: (selectedDashboard) => {
        console.log('SELECTED DC ', selectedDashboard);
        this.selectedDashboard = selectedDashboard;
      }
    })
  }


}

import { Component, OnInit } from '@angular/core';
import { IDashboard } from './dashboard.interface';
import { DashboardService } from './dashboard-service/dashboard.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  renderedDashboard: Partial<IDashboard> = {};

  constructor(
    public dashboardService: DashboardService
  ) {
  }

  ngOnInit(): void {
    this.handleRenderedDashboard();
  }

  handleRenderedDashboard(): void {
    this.dashboardService
    .renderedDashboard_
    .pipe(untilDestroyed(this))
    .subscribe({
      next: (renderedDashboard: IDashboard) => {
        this.renderedDashboard = renderedDashboard;
      }
    })
  }


}


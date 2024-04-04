import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IDashboard } from './dashboard.interface';
import { DashboardService } from './dashboard-service/dashboard.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ComponentType } from '@angular/cdk/portal';

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  @Input() widgetContainer: ComponentType<any>
  renderedDashboard: Partial<IDashboard> = {};

  constructor(
    private cdr: ChangeDetectorRef,
    public dashboardService: DashboardService,
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
        this.cdr.markForCheck();
      }
    })
  }


}


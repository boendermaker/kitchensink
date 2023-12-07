import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DashboardService } from '../dashboard.service';
import { MatTab } from '@angular/material/tabs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-dashboard-tabs',
  standalone: true,
  imports: [CommonModule, AllAngularMaterialMDCModulesModule],
  templateUrl: './dashboard-tabs.component.html',
  styleUrls: ['./dashboard-tabs.component.scss']
})
export class DashboardTabsComponent implements OnInit{

  constructor(
    public dashboardService: DashboardService
  ) {

  }

  ngOnInit(): void {
    this.dashboardService.dashboards_.pipe(untilDestroyed(this)).subscribe({
      next: (dashboards) => {
        //console.log(dashboards)
      }
    })
  }


}

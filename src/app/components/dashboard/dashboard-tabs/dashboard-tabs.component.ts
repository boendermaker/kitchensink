import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { DashboardService } from '../dashboard-service/dashboard.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatTabGroup } from '@angular/material/tabs';

@UntilDestroy()
@Component({
  selector: 'app-dashboard-tabs',
  standalone: true,
  imports: [CommonModule, AllAngularMaterialMDCModulesModule],
  templateUrl: './dashboard-tabs.component.html',
  styleUrls: ['./dashboard-tabs.component.scss']
})
export class DashboardTabsComponent implements OnInit, AfterViewInit {

  @ViewChild('tabGroup') tabGroup: MatTabGroup;

  constructor(
    public dashboardService: DashboardService
  ) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.handleTabChange();
  }

  handleTabChange(): void {
    this.dashboardService.tabIndex_.pipe(untilDestroyed(this)).subscribe({
      next: (tabIndex: number) => {
        this.tabGroup.selectedIndex = tabIndex;
      }
    })
  }

}

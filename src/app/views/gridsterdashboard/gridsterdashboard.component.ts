import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@app/components/dashboard/dashboard-service/dashboard.service';
import { widgetContent } from '@app/components/widgets/widget-content';
import { DashboardCreateComponent } from '@app/components/dashboard/dashboard-create/dashboard-create.component';
import { DashboardSettingsComponent } from '@app/components/dashboard/dashboard-settings/dashboard-settings.component';
import { ComponentType } from '@angular/cdk/portal';

@Component({
  selector: 'app-gridsterdashboard',
  templateUrl: './gridsterdashboard.component.html',
  styleUrls: ['./gridsterdashboard.component.scss'],
  providers: [DashboardService],
  standalone: false,
})
export class GridsterdashboardComponent implements OnInit {

  DashboardCreateComponent: ComponentType<any> = DashboardCreateComponent;
  DashboardSettingsComponent: ComponentType<any> = DashboardSettingsComponent;

  constructor(
    public dashboardService: DashboardService
  ) {

  }

  ngOnInit(): void {
    this.dashboardService.setWidgetContent(widgetContent);
  }

}

import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@app/components/dashboard/dashboard-service/dashboard.service';
import { widgetContent } from '@app/components/widgets/widget-content';

@Component({
  selector: 'app-gridsterdashboard',
  templateUrl: './gridsterdashboard.component.html',
  styleUrls: ['./gridsterdashboard.component.scss'],
  providers: [DashboardService]
})
export class GridsterdashboardComponent implements OnInit {

  constructor(
    public dashboardService: DashboardService
  ) {

  }

  ngOnInit(): void {
    this.dashboardService.setWidgetContent(widgetContent);
  }

}

import { Component, OnInit } from '@angular/core';
import { ICustomDashboardConfig, ICustomDashboardItem } from '@app/components/dashboard/dashboard.interface';
import { CompactType, DisplayGrid, GridType } from 'angular-gridster2';

@Component({
  selector: 'app-gridsterdashboard',
  templateUrl: './gridsterdashboard.component.html',
  styleUrls: ['./gridsterdashboard.component.scss']
})
export class GridsterdashboardComponent implements OnInit {

  dashboardState: ICustomDashboardItem[] = null;
  dashboardOptions: ICustomDashboardConfig = null;

  constructor() {

  }

  ngOnInit(): void {

    this.dashboardOptions = {

    };


    this.dashboardState = [
      {
        widgetSettings: {
          x: 0,
          y: 0,
          rows: 1,
          cols: 2,
          hasContent: true
        }
      },
      {
        widgetSettings: {
          x: 1,
          y: 0,
          rows: 1,
          cols: 2,
          hasContent: true
        }
      }
    ]

  }


}

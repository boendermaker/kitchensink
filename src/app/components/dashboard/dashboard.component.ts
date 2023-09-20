import { Component, Input } from '@angular/core';
import { GridsterConfig, GridsterItem }  from 'angular-gridster2';
import { ICustomDashboardItem } from './dashboard.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  @Input() dashboardoptions: GridsterConfig = <GridsterConfig>{};
  @Input() dashboardstate: Array<ICustomDashboardItem>;

  constructor() {

  }

}

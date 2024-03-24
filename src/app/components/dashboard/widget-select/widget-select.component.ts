import { Component, inject } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { dashboardWidgets } from '../widgets';

@Component({
  selector: 'app-widget-select',
  standalone: true,
  imports: [AllAngularMaterialMDCModulesModule, ReactiveFormsModule],
  templateUrl: './widget-select.component.html',
  styleUrl: './widget-select.component.scss'
})
export class WidgetSelectComponent {

  dashboardService = inject(DashboardService);
  widgetSelectControl = new FormControl('');
  dashboardWidgets = dashboardWidgets;
  dashboardWidgetsKeys: string[] = Object.keys(dashboardWidgets);

  constructor() {

  }

}

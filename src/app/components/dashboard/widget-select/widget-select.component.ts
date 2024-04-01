import { Component, inject } from '@angular/core';
import { DashboardService } from '../dashboard-service/dashboard.service';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
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

  constructor() {
    this.handleStateChanged();
  }

  handleStateChanged(): void {
    this.dashboardService.stateChanged_.pipe(untilDestroyed(this)).subscribe({
      next: () => {
        console.log('STATECHANGE')
        if(this.dashboardService.dashboardCount === 0) {
          this.widgetSelectControl.disable();
        }else {
          this.widgetSelectControl.enable();
        }
      }
    })
  }

}

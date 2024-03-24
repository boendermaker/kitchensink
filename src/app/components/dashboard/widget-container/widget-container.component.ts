import { Component, Input } from '@angular/core';
import { IDashboardWidget } from '../dashboard.interface';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-widget-container',
  standalone: true,
  imports: [CommonModule, AllAngularMaterialMDCModulesModule],
  templateUrl: './widget-container.component.html',
  styleUrl: './widget-container.component.scss'
})
export class WidgetcontainerComponent {

  @Input() widget: IDashboardWidget;

  constructor() {

  }

  ngOninit(): void {
    console.log('WIDGETID ', this.widget);
  }

}

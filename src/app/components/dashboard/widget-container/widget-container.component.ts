import { AfterViewInit, Component, ComponentRef, InjectionToken, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { IDashboardWidget } from '../dashboard.interface';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { CommonModule } from '@angular/common';
import { dashboardWidgets } from '../widgets';
import {
  ComponentPortal,
  DomPortal,
  Portal,
  TemplatePortal,
  PortalModule,
  CdkPortal,
  ComponentType,
} from '@angular/cdk/portal';

@Component({
  selector: 'app-widget-container',
  standalone: true,
  imports: [CommonModule, AllAngularMaterialMDCModulesModule, PortalModule],
  templateUrl: './widget-container.component.html',
  styleUrl: './widget-container.component.scss'
})
export class WidgetcontainerComponent implements OnInit, AfterViewInit {

  @ViewChild(CdkPortal) portalRef: CdkPortal;

  @Input() widget: IDashboardWidget;
  dashboardWidgets = dashboardWidgets;
  componentPortal: ComponentPortal<any>;
  componentRef: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadComponent();
  }

  loadComponent() {
    dashboardWidgets[this.widget.widgetComponentKey].displayComponent().then((component: ComponentType<any>) => {
      if(component) {
        this.componentPortal = new ComponentPortal(component)
      }
    })
  }

  onComponentRendering(ref: ComponentRef<any>): void {
    ref = ref as ComponentRef<any>;
    ref.instance['widget'] = this.widget;
  }

}

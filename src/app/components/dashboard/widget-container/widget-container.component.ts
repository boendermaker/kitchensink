import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, InjectionToken, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { IDashboardWidget } from '../dashboard.interface';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { CommonModule } from '@angular/common';
import { widgetContent } from '../widget-content';
import {
  ComponentPortal,
  DomPortal,
  Portal,
  TemplatePortal,
  PortalModule,
  CdkPortal,
  ComponentType,
} from '@angular/cdk/portal';
import { DashboardService } from '../dashboard-service/dashboard.service';
import { MatDialog } from '@angular/material/dialog';

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
  componentPortal: ComponentPortal<any>;
  componentRef: any;

  constructor(
    private dashboardService: DashboardService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadDisplayComponent();
  }

//##################################################################

  loadDisplayComponent() {
    const widgetContent = this.dashboardService.widgetUtils.getWidgetContentById(this.widget.contentId);
    widgetContent.displayComponent().then((component: ComponentType<any>) => {
      if(component) {
        this.componentPortal = new ComponentPortal(component)
      }
    })
  }

//##################################################################

  onComponentRendering(ref: ComponentRef<any>): void {
    ref = ref as ComponentRef<any>;
    ref.instance['widgetId'] = this.widget.id;
  }

//##################################################################

  removeWidget(): void {
    this.dashboardService.widgetUtils.removeById(this.widget.id);
  }

//##################################################################

  openSettingsDialog(): void {
    /*const dialogRef = this.dialog.open(this.widget, {
      data: {name: this.name, animal: this.animal},
    });*/

  }

//##################################################################

}

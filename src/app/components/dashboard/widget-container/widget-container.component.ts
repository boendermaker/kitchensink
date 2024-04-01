import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { IDashboardWidget, IDashboardWidgetContent } from '../dashboard.interface';
import { AllAngularMaterialMDCModulesModule } from '@app/shared/modules/allmaterial/allmaterial.module';
import { CommonModule } from '@angular/common';
import {
  ComponentPortal,
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

  @Input() widgetId: string;
  widget: IDashboardWidget = {};
  widgetContent: IDashboardWidgetContent = null;
  componentPortal: ComponentPortal<any>;
  componentRef: any;

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef,
    public viewContainerRef: ViewContainerRef,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.setWidget();
    this.setWidgetContent();
  }

  ngAfterViewInit(): void {
    this.loadDisplayComponent();
  }

//##################################################################

  setWidget(): void {
    this.widget = this.dashboardService.widgetUtils.getById(this.widgetId);
  }

//##################################################################

  setWidgetContent(): void {
    this.widgetContent = this.dashboardService.widgetUtils.getContentById(this.widget.contentId);
  }

//##################################################################

  loadDisplayComponent() {
    this.widgetContent.displayComponent().then((component: ComponentType<any>) => {
      if(component) {
        this.componentPortal = new ComponentPortal(component)
        this.cdr.markForCheck();
      }
    })
  }

//##################################################################

  onComponentRendering(ref: ComponentRef<any>): void {
    ref = ref as ComponentRef<any>;
    ref.instance['widgetId'] = this.widget.id;
  }

//##################################################################

  reloadWidget(): void {
    this.componentPortal = null;
    this.loadDisplayComponent();
    this.cdr.detectChanges();
  }

//##################################################################

  removeWidget(): void {
    this.dashboardService.widgetUtils.removeById(this.widget.id);
  }

//##################################################################

  openSettingsDialog() {
    this.widgetContent.settingsComponent().then((component: ComponentType<any>) => {
      this.dialog.open(component, {
        data: {
          dashboardService: this.dashboardService,
          widgetId: this.widgetId
        },
      });
    })
  }

//##################################################################

}
